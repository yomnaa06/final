import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Se connecter — Seghaier Auto Parts',
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Portail professionnel"
      title="Se connecter"
      subtitle="Accédez à votre espace pour gérer vos devis et commandes."
    >
      <LoginForm />
    </AuthShell>
  )
}
