import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: "S'inscrire — Seghaier Auto Parts",
}

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Créer un compte"
      title="S'inscrire"
      subtitle="Rejoignez notre réseau de professionnels et accédez à nos tarifs dédiés."
    >
      <RegisterForm />
    </AuthShell>
  )
}
