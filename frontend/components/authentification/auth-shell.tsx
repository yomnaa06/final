'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-steel lg:block lg:w-[46%]">
        <Image
<<<<<<< HEAD
          src="/images/auth_parts.png"
=======
          src="/images/auth-parts.png"
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
          alt="Pièces automobiles premium"
          fill priority sizes="46vw"
          className="object-cover opacity-80"
        />
<<<<<<< HEAD
        {/* degradation layered : deep blue mta logo  bottom, dark at top */}
=======
        {/* Layered gradients — deep brand-blue tint at bottom, dark at top */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1e35]/80 via-steel/50 to-steel/90" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-steel-foreground">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <div>
            <div className="mb-6 h-px w-12 bg-white/20" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel-foreground/40">
              Portail professionnel
            </p>
            <p className="mt-3 max-w-xs text-[1.35rem] font-semibold leading-snug tracking-display text-steel-foreground">
              La qualité constructeur,<br />à portée de commande.
            </p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Form  */}
=======
      {/* Form side */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
      <div className="flex flex-1 flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-foreground lg:hidden">
            <Logo />
          </Link>
          <Link
            href="/"
            className="group ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="w-full max-w-md"
          >
            <p className="label-eyebrow">{eyebrow}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-display md:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
