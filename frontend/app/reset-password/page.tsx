"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi } from '@/lib/api';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const schema = z
  .object({
    password: z.string().min(6, 'Minimum 6 caractères'),
    confirmPassword: z.string().min(6, 'Minimum 6 caractères'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!token) {
      setError('Lien de réinitialisation invalide ou expiré.');
    }
  }, [token]);

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      setError('Lien de réinitialisation invalide ou expiré.');
      return;
    }

    setError(null);
    try {
      await authApi.resetPassword(token, data.password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-[70px]">
        <div className="container mx-auto max-w-md px-5 py-16">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              Retour
            </Link>

            {success ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="size-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mot de passe réinitialisé</h2>
                <p className="mt-2 text-gray-500">Votre mot de passe a été modifié avec succès.</p>
                <p className="mt-4 text-sm text-gray-400">Redirection vers la page de connexion...</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Nouveau mot de passe</h1>
                <p className="mt-2 text-sm text-gray-500">Choisissez un mot de passe sécurisé.</p>

                {error && (
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    {error}
                  </div>
                )}

                {!error && token && (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nouveau mot de passe *
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          {...register('password')}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...register('confirmPassword')}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-brand-blue py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-blue/90 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="mx-auto size-5 animate-spin" /> : 'Réinitialiser'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}