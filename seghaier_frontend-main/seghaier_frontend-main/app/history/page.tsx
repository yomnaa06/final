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
  }

  return (
    <>
      <Navbar />
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
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : reclamations.length === 0 ? (
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
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
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
