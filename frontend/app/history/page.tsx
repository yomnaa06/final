<<<<<<< HEAD

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  FileText, 
  AlertCircle, 
  ArrowUpRight, 
  Download,
  Calendar,
  Building2,
  Package,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { useAuth } from '@/lib/auth-context';
import { devisApi, reclamationApi, type Devis, type Reclamation } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

const D_STATUS: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  EN_ATTENTE: { 
    label: 'En attente', 
    cls: 'bg-yellow-50 text-yellow-700', 
    icon: <Clock className="size-3.5" /> 
  },
  VALIDE: { 
    label: 'Validé', 
    cls: 'bg-green-50 text-green-700', 
    icon: <CheckCircle className="size-3.5" /> 
  },
  REFUS: { 
    label: 'Refusé', 
    cls: 'bg-red-50 text-red-700', 
    icon: <XCircle className="size-3.5" /> 
  },
  EN_COURS: { 
    label: 'En cours', 
    cls: 'bg-blue-50 text-blue-700', 
    icon: <Clock className="size-3.5" /> 
  },
};

const R_STATUS: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  EN_ATTENTE: { 
    label: 'En attente', 
    cls: 'bg-yellow-50 text-yellow-700', 
    icon: <Clock className="size-3.5" /> 
  },
  EN_COURS: { 
    label: 'En cours', 
    cls: 'bg-blue-50 text-blue-700', 
    icon: <Clock className="size-3.5" /> 
  },
  TRAITE: { 
    label: 'Traité', 
    cls: 'bg-green-50 text-green-700', 
    icon: <CheckCircle className="size-3.5" /> 
  },
};

export default function HistoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'devis' | 'reclamations'>('devis');

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([devisApi.getMyDevis(), reclamationApi.getMy()])
      .then(([d, r]) => { setDevis(d.data); setReclamations(r.data); })
      .finally(() => setLoading(false));
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
=======
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, FileText, AlertCircle, ArrowUpRight, Download } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { useAuth } from '@/lib/auth-context'
import { devisApi, reclamationApi, type Devis, type Reclamation } from '@/lib/api'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

const D_STATUS: Record<string, { label: string; dot: string; text: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente', dot: 'bg-amber-400',   text: 'text-amber-800',   bg: 'bg-amber-50'   },
  VALIDE:     { label: 'Validé',     dot: 'bg-emerald-500', text: 'text-emerald-800', bg: 'bg-emerald-50' },
  REFUS:      { label: 'Refusé',     dot: 'bg-red-500',     text: 'text-red-800',     bg: 'bg-red-50'     },
  EN_COURS:   { label: 'En cours',   dot: 'bg-blue-400',    text: 'text-blue-800',    bg: 'bg-blue-50'    },
}
const R_STATUS: Record<string, { label: string; dot: string; text: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente', dot: 'bg-amber-400',   text: 'text-amber-800',   bg: 'bg-amber-50'   },
  EN_COURS:   { label: 'En cours',   dot: 'bg-blue-400',    text: 'text-blue-800',    bg: 'bg-blue-50'    },
  TRAITE:     { label: 'Traité',     dot: 'bg-emerald-500', text: 'text-emerald-800', bg: 'bg-emerald-50' },
}

export default function HistoryPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [devis, setDevis]           = useState<Devis[]>([])
  const [reclamations, setRec]      = useState<Reclamation[]>([])
  const [loading, setLoading]       = useState(true)
  const [tab, setTab]               = useState<'devis' | 'reclamations'>('devis')

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [user, isLoading, router])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    Promise.all([devisApi.getMyDevis(), reclamationApi.getMy()])
      .then(([d, r]) => { setDevis(d.data); setRec(r.data) })
      .finally(() => setLoading(false))
  }, [user])

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
  }

  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <main className="min-h-screen bg-gray-50 pt-[70px] pb-16">
        <div className="container mx-auto max-w-4xl px-5 py-8">
          
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blue-600">
              Mon espace
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Mes demandes
            </h1>
            <p className="mt-2 text-gray-500">
              Historique de vos devis et réclamations
            </p>
          </motion.div>

          {/* tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex gap-2 border-b border-gray-200"
          >
            <button
              onClick={() => setTab('devis')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-300 border-b-2 ${
                tab === 'devis'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="size-4" />
              Devis ({devis.length})
            </button>
            <button
              onClick={() => setTab('reclamations')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-300 border-b-2 ${
                tab === 'reclamations'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertCircle className="size-4" />
              Réclamations ({reclamations.length})
            </button>
          </motion.div>

          {/* contenue */}
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-gray-400" />
            </div>
          ) : tab === 'devis' ? (
            devis.length === 0 ? (
              <Empty
                icon={FileText}
                title="Aucun devis"
                desc="Vous n'avez pas encore de demande de devis."
                href="/devis"
                cta="Faire une demande"
              />
            ) : (
              <div className="space-y-4">
                {devis.map((d, index) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <FileText className="size-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-gray-900">#{d.id}</span>
                              <span className="text-sm text-gray-400">•</span>
                              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Calendar className="size-3.5" />
                                {new Date(d.dateDemande).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 className="size-3.5 text-gray-400" />
                              <span className="text-sm text-gray-600">{d.brancheContact}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${D_STATUS[d.statut]?.cls}`}>
                          {D_STATUS[d.statut]?.icon}
                          {D_STATUS[d.statut]?.label ?? d.statut}
                        </span>
                      </div>

                      {/* produits */}
                      <div className="ml-11 flex flex-wrap gap-2">
                        {d.produitDesire.split(',').map((product, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                          >
                            <Package className="size-3 text-gray-400" />
                            {product.trim()}
                          </span>
                        ))}
                      </div>

                      {/* download link */}
                      {d.statut === 'VALIDE' && d.documentUrl && (
                        <div className="ml-11 mt-3">
                          <a
                            href={`${API}${d.documentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
                          >
                            <Download className="size-3.5" />
                            Télécharger le devis
=======
      <main className="min-h-screen bg-secondary pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mb-8">
            <p className="label-eyebrow">Mon espace</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-display">Mes demandes</h1>
            <p className="mt-2 text-sm text-muted-foreground">Historique de vos devis et réclamations</p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex w-fit gap-1 rounded-2xl border border-border bg-background p-1.5">
            {(['devis', 'reclamations'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
                  tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}>
                {t === 'devis' ? <><FileText className="size-4" />Devis ({devis.length})</>
                               : <><AlertCircle className="size-4" />Réclamations ({reclamations.length})</>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : tab === 'devis' ? (
            devis.length === 0 ? (
              <Empty icon={FileText} title="Aucun devis" desc="Vous n'avez pas encore de demande de devis." href="/devis" cta="Faire une demande" />
            ) : (
              <div className="space-y-3">
                {devis.map((d) => (
                  <div key={d.id} className="rounded-2xl border border-border bg-background p-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {D_STATUS[d.statut] && (
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium ${D_STATUS[d.statut].bg} ${D_STATUS[d.statut].text}`}>
                            <span className={`size-1.5 rounded-full ${D_STATUS[d.statut].dot}`} />
                            {D_STATUS[d.statut].label}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          #{d.id} · {new Date(d.dateDemande).toLocaleDateString('fr-FR')}
                          {d.dateTraitement && ` · Traité le ${new Date(d.dateTraitement).toLocaleDateString('fr-FR')}`}
                        </span>
                      </div>
                      <p className="font-medium">{d.brancheContact}</p>
                      <p className="text-sm text-muted-foreground">{d.produitDesire}</p>
                      {d.description && <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{d.description}</p>}
                      {d.motifRefus && (
                        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Motif de refus</p>
                          <p className="mt-1 text-sm text-red-700">{d.motifRefus}</p>
                        </div>
                      )}
                      {d.statut === 'VALIDE' && d.documentUrl && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Devis disponible</p>
                          <a href={`${API}${d.documentUrl}`} target="_blank" rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-background px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-50">
                            <Download className="size-3.5" /> Télécharger le document
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                          </a>
                        </div>
                      )}
                    </div>
<<<<<<< HEAD
                  </motion.div>
=======
                  </div>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                ))}
              </div>
            )
          ) : reclamations.length === 0 ? (
<<<<<<< HEAD
            <Empty
              icon={AlertCircle}
              title="Aucune réclamation"
              desc="Vous n'avez pas encore déposé de réclamation."
              href="/reclamation"
              cta="Déposer une réclamation"
            />
          ) : (
            <div className="space-y-4">
              {reclamations.map((r, index) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg text-red-600">
                          <AlertCircle className="size-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-900">#{r.id}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                              <Calendar className="size-3.5" />
                              {new Date(r.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="size-3.5 text-gray-400" />
                            <span className="text-sm text-gray-600">{r.destinataire}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${R_STATUS[r.statut]?.cls}`}>
                        {R_STATUS[r.statut]?.icon}
                        {R_STATUS[r.statut]?.label ?? r.statut}
                      </span>
                    </div>

                    <div className="ml-11">
                      <p className="font-medium text-gray-900">{r.sujet}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{r.description}</p>
                    </div>
                  </div>
                </motion.div>
=======
            <Empty icon={AlertCircle} title="Aucune réclamation" desc="Vous n'avez pas encore déposé de réclamation." href="/reclamation" cta="Déposer une réclamation" />
          ) : (
            <div className="space-y-3">
              {reclamations.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border bg-background p-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {R_STATUS[r.statut] && (
                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium ${R_STATUS[r.statut].bg} ${R_STATUS[r.statut].text}`}>
                          <span className={`size-1.5 rounded-full ${R_STATUS[r.statut].dot}`} />
                          {R_STATUS[r.statut].label}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">#{r.id} · {new Date(r.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="font-medium">{r.sujet}</p>
                    <p className="text-sm text-muted-foreground">{r.destinataire}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{r.description}</p>
                    {r.reponseAdmin && (
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Réponse de l&apos;équipe</p>
                        <p className="mt-1 text-sm text-emerald-800">{r.reponseAdmin}</p>
                      </div>
                    )}
                  </div>
                </div>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
<<<<<<< HEAD
  );
}

function Empty({
  icon: Icon,
  title,
  desc,
  href,
  cta,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white py-16 px-8 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-gray-50">
        <Icon className="size-7 text-gray-400" />
      </div>
      <h3 className="mt-4 text-xl font-medium text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        {cta}
        <ArrowUpRight className="size-4" />
      </Link>
    </motion.div>
  );
}
=======
  )
}

function Empty({ icon: Icon, title, desc, href, cta }: {
  icon: React.ElementType; title: string; desc: string; href: string; cta: string
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-background py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90">
        {cta} <ArrowUpRight className="size-4" />
      </Link>
    </div>
  )
}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
