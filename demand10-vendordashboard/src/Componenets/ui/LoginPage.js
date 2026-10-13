"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userLogin, userSignup, forgotPassword } from '@/services/userApi';
import { toast } from 'react-toastify';
import { 
  FaTimes as X,          // Close icon
  FaEnvelope as Mail,    // Mail icon
  FaLock as Lock,        // Lock icon
  FaEye as Eye,          // Eye icon
  FaEyeSlash as EyeSlash,// EyeSlash icon
  FaUserPlus as UserPlus,// Signup icon
  FaSignInAlt as SignInAlt, // SignIn icon
  FaKey as Key,          // Key icon
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft
} from 'react-icons/fa';

export default function AuthForm({ onClose = () => {}, onAuthSuccess = () => {} }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Clear error when switching between login/signup
  useEffect(() => {
    setError('');
    setSuccessMessage('');
  }, [isLogin, isForgotPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      let result;
      
      if (isForgotPassword) {
        // Handle forgot password
        result = await forgotPassword(formData.email);
        if (result.ok) {
          setSuccessMessage(result.message || 'Password reset link sent to your email.');
          // Add toast notification for successful password reset request
          toast.success('Password reset link sent! Please check your email.');
        } else {
          setError(result.message || 'Failed to send password reset link.');
          toast.error(result.message || 'Failed to send password reset link.');
        }
      } else if (isLogin) {
        // Handle login
        result = await userLogin({
          email: formData.email,
          password: formData.password
        });
        
        if (result.ok) {
          toast.success('Login successful!');
          console.log('Calling onAuthSuccess with user:', result.user);
          if (typeof onAuthSuccess === 'function') {
            onAuthSuccess(result.user);
          } else {
            console.warn('onAuthSuccess is not a function');
          }
          if (typeof onClose === 'function') {
            onClose();
          }
          // Don't redirect to dashboard, let the parent component handle navigation
        } else {
          // Show specific error messages for different login failure cases
          const errorMessage = result.message || 'Login failed';
          setError(errorMessage);
          
          // Special handling for blocked users - show toast with HTML content
          if (result.message && result.message.includes('blocked')) {
            toast.error(
              <div>
                {result.message} <br />
                <span className="font-semibold">Please contact the support team for assistance.</span>
              </div>
            );
          } else {
            toast.error(errorMessage);
          }
        }
      } else {
        // Handle signup
        // Validation for signup
        if (formData.password !== formData.confirmPassword) {
          const errorMessage = 'Passwords do not match';
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          const errorMessage = 'Password must be at least 6 characters';
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }
        
        result = await userSignup({
          email: formData.email,
          password: formData.password
        });
        
        if (result.ok) {
          toast.success('Account created successfully! Please check your email for verification.');
          setIsLogin(true);
          setFormData(prev => ({
            email: prev.email,
            password: '',
            confirmPassword: ''
          }));
        } else {
          const errorMessage = result.message || 'Signup failed';
          setError(errorMessage);
          toast.error(errorMessage);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setIsLogin(true);
    setIsForgotPassword(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#4897de]">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={() => {
              if (typeof onClose === 'function') {
                onClose();
              }
            }}
            className="text-gray-500 hover:text-[#4897de] transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-8">
          {isForgotPassword 
            ? 'Enter your email to receive a password reset link' 
            : isLogin 
              ? 'Sign in to continue to your account' 
              : 'Create an account to get started'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all text-base"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>
          </div>
          
          {!isForgotPassword && isLogin && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all text-base"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          {!isForgotPassword && !isLogin && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all text-base"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all text-base"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <FaExclamationCircle className="h-5 w-5 text-red-500 mr-2" />
                <div className="text-sm text-red-700">
                  {typeof error === 'string' ? error : <span dangerouslySetInnerHTML={{ __html: error }} />}
                </div>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div className="text-sm text-green-700">
                  {successMessage}
                </div>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-[#0249aa] to-[#4897de] hover:from-[#4897de] hover:to-[#0249aa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4897de] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isForgotPassword ? 'Sending...' : isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              <div className="flex items-center">
                {isForgotPassword ? (
                  <>
                    <Key className="mr-2" />
                    Send Reset Link
                  </>
                ) : isLogin ? (
                  <>
                    <SignInAlt className="mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" />
                    Create Account
                  </>
                )}
              </div>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          {!isForgotPassword ? (
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    ...formData,
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="ml-2 font-medium text-[#4897de] hover:text-[#4897de] transition-colors"
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => resetForm()}
                className="font-medium text-[#4897de] hover:text-[#4897de] transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
          
          {isLogin && !isForgotPassword && (
            <p className="mt-3 text-sm text-gray-600">
              <button
                onClick={() => {
                  setIsForgotPassword(true);
                  setFormData({
                    ...formData,
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="font-medium text-[#4897de] hover:text-[#4897de] transition-colors flex items-center justify-center"
              >
                <Key className="mr-1 h-4 w-4" />
                Forgot your password?
              </button>
            </p>
          )}
          
          {/* Back to main auth option */}
          {isForgotPassword && (
            <p className="mt-4 text-sm text-gray-600">
              <button
                onClick={resetForm}
                className="font-medium text-[#4897de] hover:text-[#4897de] transition-colors flex items-center justify-center"
              >
                <FaArrowLeft className="mr-1 h-4 w-4" />
                Back to Sign In
              </button>
            </p>
          )}
        </div>
       
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}