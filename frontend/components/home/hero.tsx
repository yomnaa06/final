'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
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
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl"
        >
          Distributeur B2B de pièces automobiles de qualité constructeur.
          Filtres, freinage, lubrifiants et suspensions — sélectionnés,
          contrôlés et livrés avec exigence.
        </motion.p>

        {/* cta */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.38 }}
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
          </Link>
        </motion.div>
      </div>

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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.07 }}
              className={`py-5 md:py-7 ${i % 2 === 0 ? 'pr-6' : 'pl-6'} md:px-8`}
            >
              <div className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs font-light text-white/40 md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
