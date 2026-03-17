'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthMutations } from '@/hooks/mutations/useAuth';
import { Loader2, Lock, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid');
    const otp = searchParams.get('otp') || searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { resetPasswordMutation } = useAuthMutations();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        if (uuid && otp) {
            resetPasswordMutation.mutate({ uuid, otp, password });
        }
    };

    if (resetPasswordMutation.isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8 rounded-3xl border bg-secondary-ui/20 p-8 backdrop-blur-xl text-center"
                >
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary-ui/10 flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-10 w-10 text-primary-ui" />
                    </div>
                    <h2 className="text-3xl font-bold">Password Reset</h2>
                    <p className="mt-2 text-sm text-secondary-foreground opacity-60">
                        Your password has been successfully reset. You can now login with your new password.
                    </p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="mt-8 flex w-full justify-center rounded-2xl bg-primary-ui py-4 text-sm font-bold text-background transition-all hover:opacity-90"
                    >
                        Go to login
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md space-y-8 rounded-3xl border bg-secondary-ui/20 p-8 backdrop-blur-xl"
            >
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-primary-ui flex items-center justify-center mb-4">
                        <span className="font-bold text-background text-2xl italic">Z</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Set new password</h2>
                    <p className="mt-2 text-sm text-secondary-foreground opacity-60">
                        Please enter your new password below.
                    </p>
                </div>

                {!uuid || !otp ? (
                    <div className="flex flex-col items-center gap-4 text-center mt-8">
                        <AlertCircle className="h-12 w-12 text-destructive opacity-50" />
                        <p className="text-sm text-secondary-foreground">
                            Invalid or missing reset token. Please request a new password reset link.
                        </p>
                        <button
                            onClick={() => router.push('/auth/forgot-password')}
                            className="text-primary-ui font-bold hover:underline"
                        >
                            Request new link
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full rounded-2xl border bg-background py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-primary-ui/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-40" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm New Password"
                                    className="w-full rounded-2xl border bg-background py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-primary-ui/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {password !== confirmPassword && confirmPassword !== '' && (
                            <p className="text-xs text-destructive">Passwords do not match</p>
                        )}

                        {resetPasswordMutation.isError && (
                            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <span>
                                    {(resetPasswordMutation.error as any)?.response?.data?.message ||
                                        resetPasswordMutation.error?.message ||
                                        'Failed to reset password. The link may have expired.'}
                                </span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={resetPasswordMutation.isPending || password !== confirmPassword}
                            className="group relative flex w-full justify-center rounded-2xl bg-primary-ui py-4 text-sm font-bold text-background transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {resetPasswordMutation.isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                'Reset password'
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
