// backend/src/model/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin', 'superadmin'],
      default: 'user',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      index: true,
    },
    isEmailVerified: { type: Boolean, default: false, index: true },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    refreshTokenHash: { type: String, select: false },
    refreshTokenExpiresAt: { type: Date, select: false },
    lastLoginAt: Date,
    lastLoginIp: String,
    deletedAt: { type: Date, default: null, index: true },
    claimedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyTeam',
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, status: 1 });
userSchema.index({ email: 1, role: 1 });
userSchema.index({ createdAt: -1 });

userSchema.pre(/^find/, function excludeDeleted(next) {
  if (!Object.prototype.hasOwnProperty.call(this.getFilter(), 'deletedAt')) {
    this.where({ deletedAt: null });
  }
  next();
});

// Use the guard so hot-reload doesn't crash
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;