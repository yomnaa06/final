'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { v: '1987',    l: 'Fondée en'          },
  { v: '12 000+', l: 'Références en stock' },
  { v: '40+',     l: 'Marques partenaires' },
  { v: '24 h',    l: 'Délai de livraison'  },
]

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0f0f0f] text-white">

      {/* Photo — displayed cleanly, only a neutral dark vignette at the bottom */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-engine.png"
          alt="Bloc moteur automobile de précision"
          fill priority sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        {/* Neutral vignette — no colour tint, just darkness for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </div>

      {/* Red accent line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 top-0 h-[4px] bg-brand-red"
      />

      {/* Main content */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-[3px] w-8 rounded-full bg-brand-red" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            Pièces automobiles — Tunisie — Depuis 1987
          </span>
        </motion.div>

        {/* Headline — large, clean, white */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-display sm:text-5xl md:text-[5rem]"
        >
          La précision
          <br />au cœur de
          <br />
          <span className="text-brand-red">chaque pièce.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mt-7 max-w-lg text-[16px] font-normal leading-relaxed text-white/65 md:text-[17px]"
        >
          Distributeur B2B de pièces automobiles de qualité constructeur.
          Filtres, freinage, lubrifiants et suspensions — sélectionnés,
          contrôlés et livrés avec exigence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.38 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link href="/devis"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-red px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-black/30 transition-all duration-200 hover:bg-brand-red/90">
            Construire mon devis
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link href="/#a-propos"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-[15px] font-medium text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white">
            Découvrir la société
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Stats strip — white text on slightly lighter dark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.55 }}
        className="border-t border-white/10 bg-black/30 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.07 }}
              className={`py-5 md:py-7 ${i % 2 === 0 ? 'pr-6' : 'pl-6'} md:px-8`}
            >
              <div className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{s.v}</div>
              <div className="mt-0.5 text-xs text-white/45 md:text-sm">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
