'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LawvoxAPI } from '../../services/api';

export default function LoginPage() {
  const router = useRouter();
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accountName.trim() || !password.trim()) {
      setError('Please enter both account name and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await LawvoxAPI.login(accountName.trim(), password);

      if (result.ok && result.data?.success) {
        // Store simple session marker
        sessionStorage.setItem('lawvox_auth', 'true');
        sessionStorage.setItem('lawvox_user', accountName.trim());
        router.push('/');
      } else {
        setError('Invalid account name or password');
      }
    } catch (err) {
      setError('Invalid account name or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-8 sm:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-100 flex items-center justify-center">
              <Scale className="w-8 h-8 text-purple-700" strokeWidth={1.75} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-center text-slate-900">
            LAWVOX Login
          </h1>
          <p className="text-sm text-center text-slate-500 mt-2 mb-8">
            Sign in to access your legal research workspace
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Name */}
            <div>
              <label
                htmlFor="accountName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Account Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter your account name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3">
                <p className="text-sm text-rose-700 text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in…' : 'Login →'}
            </Button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400">
              LegalPrecedent is a legal research assistance prototype.
            </p>
          </div>
        </div>

        {/* Below-card note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Access is restricted to authorized users.
        </p>
      </div>
    </div>
  );
}
