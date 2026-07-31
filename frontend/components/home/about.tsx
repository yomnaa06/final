<<<<<<< HEAD
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users2 } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Qualité constructeur",
    desc: "Chaque référence est sélectionnée auprès de fabricants certifiés et contrôlée avant expédition.",
  },
  {
    icon: Truck,
    title: "Disponibilité immédiate",
    desc: "Un stock profond et une logistique maîtrisée pour répondre à vos commandes sans délai.",
  },
  {
    icon: Users2,
    title: "Service B2B dédié",
    desc: "Un interlocuteur unique, des devis rapides et un suivi de commande transparent.",
  },
];

export function About() {
  return (
    <section 
      href="/about"  
      className="relative overflow-hidden bg-[#0e2756] py-24 text-white md:py-32"
    >
      {/* grid (blueprint) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#7FA6E8 1px, transparent 1px), linear-gradient(90deg, #7FA6E8 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* soft red glow */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-[#C81E3A]/12 blur-[140px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">

        {/* headline + histoire */}
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-[#C81E3A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#7FA6E8]">
                À propos
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.15] tracking-tight md:text-5xl lg:text-[3.25rem]">
              Une exigence
              <br />
              industrielle,
              <br />
              <span className="text-[#7FA6E8]">une culture familiale.</span>
            </h2>
          </motion.div>

          {/* description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              Fondée en 1987, SEGHAIER Pièces Auto approvisionne les garages,
              flottes et industriels tunisiens en composants automobiles
              d&apos;origine. Chaque référence de notre catalogue est
              sélectionnée pour sa fiabilité, sa traçabilité et son adéquation
              à un usage professionnel intensif.
            </p>
          </motion.div>
        </div>

        {/* pilliers */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-500 hover:border-[#C81E3A]/50 hover:bg-white/[0.06]"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#C81E3A] transition-transform duration-500 group-hover:scale-y-100" />

              <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-[#7FA6E8]/25 bg-white/5 text-[#7FA6E8] transition-all duration-300 group-hover:border-[#C81E3A] group-hover:bg-[#C81E3A]/10 group-hover:text-[#C81E3A]">
                <p.icon className="size-5" strokeWidth={1.75} />
              </div>

              <h3 className="text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {p.desc}
              </p>
            </motion.div>
=======
// src/components/home/about.tsx
"use client";

import { Shield, Truck, Users } from 'lucide-react'

export function About() {
  return (
    <section className="bg-blue-900 py-16 md:py-24 text-white">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-300/60">
            À propos
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Une exigence industrielle, <br />
            <span className="text-blue-300">une culture familiale.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-blue-100/80 max-w-3xl mx-auto">
            Fondée en 1987, SEGHAIER Pièces Auto approvisionne les garages, 
            flottes et industriels tunisiens en composants automobiles d'origine. 
            Chaque référence de notre catalogue est sélectionnée pour sa fiabilité, 
            sa traçabilité et son adéquation à un usage professionnel intensif.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: 'Qualité constructeur',
              desc: 'Chaque référence est sélectionnée auprès de fabricants certifiés et contrôlée avant expédition.'
            },
            {
              icon: Truck,
              title: 'Disponibilité immédiate',
              desc: 'Un stock profond et une logistique maîtrisée pour répondre à vos commandes sans délai.'
            },
            {
              icon: Users,
              title: 'Service B2B dédié',
              desc: 'Un interlocuteur unique, des devis rapides et un suivi de commande transparent.'
            },
          ].map((item, index) => (
            <div key={item.title} className="text-center md:text-left">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-300/40 mb-4">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <item.icon className="size-5 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-blue-100/70">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
          {[
            { number: '1987', label: 'Fondée en' },
            { number: '12 000+', label: 'Références en stock' },
            { number: '40+', label: 'Marques partenaires' },
            { number: '24h', label: 'Délai de livraison' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.number}</p>
              <p className="mt-1 text-sm text-blue-200/60">{stat.label}</p>
            </div>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
          ))}
        </div>
      </div>
    </section>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
}