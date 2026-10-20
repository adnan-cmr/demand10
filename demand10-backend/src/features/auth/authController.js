// backend/src/features/auth/authController.js
import bcrypt from 'bcrypt';
import User from '../../model/User.js';
import { env } from '../../config/env.js';
import {
  signAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  generateOpaqueToken,
} from '../../utils/tokens.js';
import { setAuthCookies, clearAuthCookies } from '../../utils/cookies.js';
import sendEmail from '../../utils/sendEmail.js';
import {
  generateVerificationEmailTemplate,
  generatePasswordResetEmailTemplate,
} from '../../emails/templates/auth.js';

const BCRYPT_ROUNDS = 12;
const VERIFY_TTL_MS = 24 * 60 * 60 * 1000;      // 24h
const RESET_TTL_MS = 60 * 60 * 1000;            // 1h
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7d

const publicUser = (u) => ({
  id: u._id,
  email: u.email,
  name: u.name,
  role: u.role,
  isEmailVerified: u.isEmailVerified,
  createdAt: u.createdAt,
});

// ─────────────────────────────────────────────
//  REGISTER
// ─────────────────────────────────────────────
export async function register(req, res) {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: 'Password must be at least 6 characters' });
    }
    // Only allow 'user' or 'vendor' at registration. Admin must be promoted by superadmin.
    const desiredRole = role === 'vendor' ? 'vendor' : 'user';

    const existing = await User.findOne({ email: email.toLowerCase(), deletedAt: null });
    if (existing) {
      return res.status(400).json({ ok: false, message: 'User already exists with this email' });
    }

    const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const verificationToken = generateOpaqueToken(32);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashed,
      name: name || '',
      role: desiredRole,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + VERIFY_TTL_MS),
    });

    // Send verification email
    const url = `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const tpl = generateVerificationEmailTemplate(url, user.email);
    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email Address',
      text: tpl.text,
      html: tpl.html,
    });

    return res.status(201).json({
      ok: true,
      message: 'Registered. Check your email to verify your account.',
      user: publicUser(user),
    });
  } catch (err) {
    req.log.error({ err }, 'register failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  VERIFY EMAIL
// ─────────────────────────────────────────────
export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ ok: false, message: 'Token required' });

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({ ok: false, message: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.json({ ok: true, message: 'Email verified. You can now log in.' });
  } catch (err) {
    req.log.error({ err }, 'verifyEmail failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  LOGIN
// ─────────────────────────────────────────────
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }
    if (user.status === 'blocked') {
      return res.status(403).json({ ok: false, message: 'Your account has been blocked. Contact support.' });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({ ok: false, message: 'Please verify your email before logging in.' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password' });
    }

    const accessToken = signAccessToken(user);
    const { raw: refreshRaw, hash: refreshHash } = generateRefreshToken();

    user.refreshTokenHash = refreshHash;
    user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TTL_MS);
    user.lastLoginAt = new Date();
    user.lastLoginIp = req.ip;
    await user.save();

    // New auth cookies
    setAuthCookies(res, accessToken, refreshRaw);

    return res.json({ ok: true, user: publicUser(user) });
  } catch (err) {
    req.log.error({ err }, 'login failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  REFRESH
// ─────────────────────────────────────────────
export async function refresh(req, res) {
  try {
    const raw = req.cookies?.refreshToken;
    if (!raw) return res.status(401).json({ ok: false, message: 'No refresh token' });

    const hashed = hashRefreshToken(raw);
    const user = await User.findOne({
      refreshTokenHash: hashed,
      refreshTokenExpiresAt: { $gt: new Date() },
      deletedAt: null,
    }).select('+refreshTokenHash +refreshTokenExpiresAt');

    if (!user) return res.status(401).json({ ok: false, message: 'Invalid refresh token' });
    if (user.status === 'blocked') return res.status(403).json({ ok: false, message: 'Account blocked' });

    // Rotate
    const accessToken = signAccessToken(user);
    const { raw: newRaw, hash: newHash } = generateRefreshToken();
    user.refreshTokenHash = newHash;
    user.refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TTL_MS);
    await user.save();

    setAuthCookies(res, accessToken, newRaw);
    return res.json({ ok: true, user: publicUser(user) });
  } catch (err) {
    req.log.error({ err }, 'refresh failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  LOGOUT
// ─────────────────────────────────────────────
export async function logout(req, res) {
  try {
    // If authenticated, clear refreshToken from DB
    const raw = req.cookies?.refreshToken;
    if (raw) {
      const hashed = hashRefreshToken(raw);
      await User.updateOne(
        { refreshTokenHash: hashed },
        { $unset: { refreshTokenHash: 1, refreshTokenExpiresAt: 1 } }
      );
    }
    clearAuthCookies(res);
    return res.json({ ok: true, message: 'Logged out' });
  } catch (err) {
    req.log.error({ err }, 'logout failed');
    // Even if DB update failed, clear cookies
    clearAuthCookies(res);
    return res.json({ ok: true, message: 'Logged out' });
  }
}

// ─────────────────────────────────────────────
//  ME
// ─────────────────────────────────────────────
export async function me(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.userId, deletedAt: null });
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    return res.json({ ok: true, user: publicUser(user) });
  } catch (err) {
    req.log.error({ err }, 'me failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  FORGOT PASSWORD
// ─────────────────────────────────────────────
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false, message: 'Email required' });

    const user = await User.findOne({ email: email.toLowerCase(), deletedAt: null });
    // Always return ok — don't leak which emails exist
    if (!user) return res.json({ ok: true, message: 'If that email exists, a reset link was sent.' });

    const token = generateOpaqueToken(32);
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + RESET_TTL_MS);
    await user.save();

    const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;
    const tpl = generatePasswordResetEmailTemplate(url, user.email);
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: tpl.text,
      html: tpl.html,
    });

    return res.json({ ok: true, message: 'If that email exists, a reset link was sent.' });
  } catch (err) {
    req.log.error({ err }, 'forgotPassword failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

// ─────────────────────────────────────────────
//  RESET PASSWORD
// ─────────────────────────────────────────────
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ ok: false, message: 'Valid token and password required' });
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
      deletedAt: null,
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) return res.status(400).json({ ok: false, message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // Invalidate all sessions
    user.refreshTokenHash = undefined;
    user.refreshTokenExpiresAt = undefined;
    await user.save();

    return res.json({ ok: true, message: 'Password reset. Please log in.' });
  } catch (err) {
    req.log.error({ err }, 'resetPassword failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}