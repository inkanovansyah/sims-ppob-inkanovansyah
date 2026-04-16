import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { login } from '../services/authService';
import { loginSuccess, loginFailed, setLoading, clearError } from '../store/slices/authSlice';
import { loginSchema, LoginFormValues } from '../utils/validation';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const onFormSubmit = async (data: LoginFormValues) => {
    try {
      dispatch(setLoading());
      const response = await login(data);
      
      if (response.status === 0) {
        dispatch(loginSuccess(response.data.token));
      } else {
        dispatch(loginFailed(response.message || 'Login failed'));
      }
    } catch (err: any) {
      dispatch(loginFailed(err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white font-sans overflow-hidden">
      <div className="flex w-full h-full">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-20 overflow-y-auto">
          <div className="max-w-md w-full">
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-2 mb-6">
                <img src="/assets/Logo.png" alt="SIMS PPOB Logo" className="w-8 h-8 object-contain" />
                <h1 className="text-2xl font-bold text-slate-900">SIMS PPOB</h1>
              </div>
              <h2 className="text-3xl font-bold text-center text-slate-900 px-6">
                Masuk atau buat akun untuk memulai
              </h2>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-1">
                <div className={`relative flex items-center border rounded-md transition-all ${
                  errors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-300 focus-within:border-red-500'
                }`}>
                  <span className="pl-4 text-slate-400">
                    <span className="text-xl">@</span>
                  </span>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="masukkan email anda"
                    className="w-full pl-3 pr-4 py-3 bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 text-right font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className={`relative flex items-center border rounded-md transition-all ${
                  (errors.password || error) ? 'border-red-500 bg-red-50/10' : 'border-slate-300 focus-within:border-red-500'
                }`}>
                  <span className="pl-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    {...register('password')}
                    type={showPassword ? "text" : "password"}
                    placeholder="masukkan password anda"
                    className="w-full pl-3 pr-10 py-3 bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 text-right font-medium">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f42619] hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                Masuk
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                belum punya akun? registrasi <Link to="/register" className="text-[#f42619] font-bold hover:underline">di sini</Link>
              </p>
            </div>

            {/* Error Alert - Directly below form as requested */}
            {error && (
              <div className="mt-4 w-full">
                <div className="bg-[#fff5f5] border border-red-100 p-2 rounded flex items-center justify-between shadow-sm">
                  <p className="text-[#f42619] text-[10px] font-medium">{error}</p>
                  <button onClick={() => dispatch(clearError())} className="text-[#f42619] text-sm font-bold leading-none">×</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:block w-1/2 bg-[#fff5f5]">
          <div className="h-full flex items-center justify-center">
            <img 
              src="/assets/Illustrasi Login.png" 
              alt="Login Illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
