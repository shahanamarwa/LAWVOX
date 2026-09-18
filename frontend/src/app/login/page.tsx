'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LawvoxLogo } from '../../components/layout/LawvoxLogo';
import { AuthService } from '../../services/auth';
import { LawvoxAPI } from '../../services/api';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Headphones,
  Scale,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // If already authenticated, redirect to dashboard immediately
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      router.replace('/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedAccount = accountName.trim();
    if (!trimmedAccount || !password) {
      setErrorMessage('Please enter both account name and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await LawvoxAPI.login(trimmedAccount, password);

      if (response.success && response.token) {
        // Save session state safely
        AuthService.saveSession({
          token: response.token,
          user: response.user || {
            accountName: trimmedAccount,
            name: trimmedAccount === 'lakshmi' ? 'Lakshmi' : trimmedAccount,
            role: 'Constitutional Law Researcher',
          },
          loggedInAt: new Date().toISOString(),
        });

        // Redirect to LAWVOX dashboard
        router.push('/dashboard');
      } else {
        // Display exact required error message on invalid credentials
        setErrorMessage(response.message || 'Invalid account name or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Invalid account name or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            Initializing LAWVOX Workspace...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-amber-500/20 selection:text-amber-200">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Header / Brand Area */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 px-4">
        <div className="flex justify-center mb-5">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <LawvoxLogo showSubtitle={false} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
          Constitutional Law Portal
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          Sign in to access curated precedent audio, landmark bench briefs, and courtroom research tools.
        </p>

        {/* Predefined Account Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-medium text-slate-300 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Predefined Research Account Authentication</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl relative">
          {/* Subtle top gold accent line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Error Message Alert Banner */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span className="flex-1 leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Account Name Field */}
            <div>
              <label
                htmlFor="accountName"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Account Name
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="accountName"
                  name="accountName"
                  type="text"
                  autoComplete="username"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="lakshmi"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit / Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs tracking-wide uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to LAWVOX</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Legal System Note (Strictly NO sign-up links) */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-500/80" />
              <span>Restricted Legal Portal • Pre-authorized Access Only</span>
            </p>
          </div>
        </div>

        {/* Footer Feature Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Audio Sync</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Basic Structure Precedents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
