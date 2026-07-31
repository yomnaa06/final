'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
<<<<<<< HEAD
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
=======
import { ArrowUpRight, ArrowRight } from 'lucide-react'
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
<<<<<<< HEAD
  { value: '1987',    label: 'Fondée en'          },
  { value: '12 000+', label: 'Références en stock' },
  { value: '40+',     label: 'Marques partenaires' },
  { value: '24 h',    label: 'Délai de livraison'  },
]

export function Hero() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0a0a0a] text-white">

      {/* bckg video  */}
      <div className="absolute inset-0 -z-10">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/sghvf.mp4" type="video/mp4" />
            <source src="/videos/hero-bg.webm" type="video/webm" />
            {/* image de recuperation si video ne marche ps */}
            <Image
              src="/images/hero-engine.png"
              alt="Bloc moteur automobile de précision"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </video>
        ) : (
          <Image
            src="/images/hero-engine.png"
            alt="Bloc moteur automobile de précision"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-red-500/5" />
      </div>

      {/* contenue  */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">

      {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center gap-4"
        >
        <div className="h-[2px] w-12 bg-red-600" />
          <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-red-500">
            Depuis 1987
          </span>
        </motion.div>

        {/* Headline */}
=======
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
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
<<<<<<< HEAD
          className="max-w-4xl font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-[5.5rem] lg:text-[6rem]"
        >
          <span className="text-white/90">La précision</span>
          <br />
          <span className="text-white/90">au cœur de</span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-white to-red-200 bg-clip-text text-transparent">
            chaque pièce.
          </span>
        </motion.h1>

        {/* subtitle de description */}
=======
          className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-display sm:text-5xl md:text-[5rem]"
        >
          La précision
          <br />au cœur de
          <br />
          <span className="text-brand-red">chaque pièce.</span>
        </motion.h1>

        {/* Sub */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
<<<<<<< HEAD
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl"
=======
          className="mt-7 max-w-lg text-[16px] font-normal leading-relaxed text-white/65 md:text-[17px]"
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        >
          Distributeur B2B de pièces automobiles de qualité constructeur.
          Filtres, freinage, lubrifiants et suspensions — sélectionnés,
          contrôlés et livrés avec exigence.
        </motion.p>

<<<<<<< HEAD
        {/* cta */}
=======
        {/* CTAs */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.38 }}
<<<<<<< HEAD
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/devis"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-600/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Construire mon devis
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            Découvrir la société
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
=======
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
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
          </Link>
        </motion.div>
      </div>

<<<<<<< HEAD
      {/* bande stats  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.55 }}
        className="border-t border-white/5 bg-black/40 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 px-6 md:grid-cols-4 md:px-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
=======
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
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.07 }}
              className={`py-5 md:py-7 ${i % 2 === 0 ? 'pr-6' : 'pl-6'} md:px-8`}
            >
<<<<<<< HEAD
              <div className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs font-light text-white/40 md:text-sm">
                {stat.label}
              </div>
=======
              <div className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{s.v}</div>
              <div className="mt-0.5 text-xs text-white/45 md:text-sm">{s.l}</div>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
