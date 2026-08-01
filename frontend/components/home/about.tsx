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
          ))}
        </div>
      </div>
    </section>
  );
}