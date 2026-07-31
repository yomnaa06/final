"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LoaderAnimation from '@/components/site/LoaderAnimation';

export function CtaBand() {
  return (
    <section className="w-full">
      {/* carte de cta  */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden rounded-none bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 shadow-2xl mx-0"
      >
        {/* red accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        
        {/* elements de decoration*/}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-14 w-full max-w-7xl mx-auto">
          
          {/* texte de desc  */}
          <div className="text-white flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
              Nous sommes là pour vous
            </h2>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed mt-3 max-w-md">
              Une question, un devis, une réclamation ? Notre équipe est à votre écoute.
            </p>

            {/* boutton contact */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-3.5 rounded-xl font-semibold text-sm shadow-xl shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] mt-6"
            >
              <span>Contactez-nous</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* ===== animation seghaier ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <LoaderAnimation />
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}