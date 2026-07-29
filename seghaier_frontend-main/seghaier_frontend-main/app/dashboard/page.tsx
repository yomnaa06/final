'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Users, FileText, AlertCircle, Clock,
  CheckCircle2, XCircle, ArrowRight, RefreshCcw,
} from 'lucide-react'
import { adminApi, type DashboardStats, type Devis, type Reclamation } from '@/lib/api'

type DashboardData = {
  stats: DashboardStats
  notifications: {
    pendingDevis:        { count: number; items: Devis[] }
    pendingReclamations: { count: number; items: Reclamation[] }
    totalPending:        number
  }
  lastUpdated: string
}

export default function DashboardPage() {
  const [data, setData]    = useState<DashboardData | null>(null)
  const [loading, setLoad] = useState(true)
  const [error, setError]  = useState<string | null>(null)
  const [ts, setTs]        = useState(new Date())

  const load = useCallback(() => {
    setLoad(true)
    adminApi.getDashboard()
      .then((r) => { setData(r.data); setTs(new Date()) })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoad(false))
  }, [])

  useEffect(() => { load() }, [load])

  if (loading && !data) return <Spinner />
  if (error) return <ErrState msg={error} onRetry={load} />
  if (!data) return null

  const { stats: s, notifications: n } = data
  const devisRate = s.devis.total > 0 ? Math.round((s.devis.VALIDE / s.devis.total) * 100) : 0
  const reclRate  = s.reclamations.total > 0 ? Math.round((s.reclamations.TRAITE / s.reclamations.total) * 100) : 0

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="label-eyebrow">Vue d&apos;ensemble</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-display">Tableau de bord</h1>
        </div>
        <button
          onClick={load} disabled={loading}
          className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <RefreshCcw className={`size-3 ${loading ? 'animate-spin' : ''}`} />
          {ts.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </button>
      </div>

      {/* Alert banner */}
      {n.totalPending > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <Clock className="size-4 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{n.totalPending}</span> élément{n.totalPending > 1 ? 's' : ''} en attente —{' '}
            {n.pendingDevis.count} devis · {n.pendingReclamations.count} réclamations
          </p>
        </div>
      )}

      {/* KPI cards — left-accent stripe style */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: 'Clients', value: s.totalClients, href: '/dashboard/clients',
            sub: undefined, alert: false, stripe: 'bg-brand-blue',
          },
          {
            label: 'Devis', value: s.devis.total, href: '/dashboard/devis',
            sub: `${s.devis.EN_ATTENTE} en attente`, alert: s.devis.EN_ATTENTE > 0,
            stripe: 'bg-brand-blue',
          },
          {
            label: 'Réclamations', value: s.reclamations.total, href: '/dashboard/reclamations',
            sub: `${s.reclamations.EN_ATTENTE} en attente`, alert: s.reclamations.EN_ATTENTE > 0,
            stripe: 'bg-brand-blue',
          },
          {
            label: 'En attente', value: n.totalPending, href: undefined,
            sub: n.totalPending === 0 ? 'À jour ✓' : 'À traiter',
            alert: n.totalPending > 0, stripe: n.totalPending > 0 ? 'bg-brand-red' : 'bg-emerald-500',
          },
        ].map((k) => {
          const inner = (
            <div className="group flex h-full overflow-hidden rounded-lg border border-border bg-background transition-colors hover:bg-secondary/60">
              {/* Accent stripe */}
              <div className={`w-1 shrink-0 ${k.stripe}`} />
              <div className="flex-1 px-5 py-5">
                <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                <p className="mt-1.5 text-3xl font-semibold tracking-display">{k.value}</p>
                {k.sub && (
                  <p className={`mt-1 text-[11px] font-medium ${k.alert ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {k.sub}
                  </p>
                )}
              </div>
            </div>
          )
          return k.href
            ? <Link key={k.label} href={k.href} className="block">{inner}</Link>
            : <div key={k.label}>{inner}</div>
        })}
      </div>

      {/* Performance */}
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            label: 'Taux de validation devis', pct: devisRate,
            bar: 'bg-brand-blue', left: `${s.devis.VALIDE} validés`, right: `${s.devis.REFUS} refusés`,
          },
          {
            label: 'Taux de traitement réclamations', pct: reclRate,
            bar: 'bg-emerald-500', left: `${s.reclamations.TRAITE} traitées`, right: `${s.reclamations.EN_ATTENTE} en attente`,
          },
        ].map((b) => (
          <div key={b.label} className="rounded-lg border border-border bg-background px-5 py-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-medium text-muted-foreground">{b.label}</p>
              <span className="shrink-0 text-xl font-semibold tracking-display">{b.pct}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
              <div className={`h-full rounded-full transition-all duration-700 ${b.bar}`} style={{ width: `${b.pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>{b.left}</span>
              <span>{b.right}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pending lists */}
      <div className="grid gap-4 lg:grid-cols-2">
        <PendingCard title="Devis en attente" count={n.pendingDevis.count} href="/dashboard/devis" cta="Traiter les devis" empty={n.pendingDevis.items.length === 0}>
          {n.pendingDevis.items.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{d.client?.nom ?? `Client #${d.clientId}`}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{d.brancheContact} · {d.produitDesire}</p>
              </div>
              <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
                {new Date(d.dateDemande).toLocaleDateString('fr-FR')}
              </span>
            </li>
          ))}
        </PendingCard>

        <PendingCard title="Réclamations en attente" count={n.pendingReclamations.count} href="/dashboard/reclamations" cta="Répondre aux réclamations" empty={n.pendingReclamations.items.length === 0}>
          {n.pendingReclamations.items.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.client?.nom ?? `Client #${r.clientId}`}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.sujet}</p>
              </div>
              <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">
                {new Date(r.date).toLocaleDateString('fr-FR')}
              </span>
            </li>
          ))}
        </PendingCard>
      </div>
    </div>
  )
}

function PendingCard({ title, count, href, cta, empty, children }: {
  title: string; count: number; href: string; cta: string; empty: boolean; children: React.ReactNode
}) {
  return (
    <section className="flex flex-col rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-semibold">{title}</h2>
          {count > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">{count}</span>
          )}
        </div>
        <Link href={href} className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
          Tout voir <ArrowRight className="size-3" />
        </Link>
      </div>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-muted-foreground">
          <CheckCircle2 className="mb-2 size-6 text-emerald-500" />
          <p className="text-xs">Aucun élément en attente</p>
        </div>
      ) : (
        <ul className="flex-1 divide-y divide-border">{children}</ul>
      )}

      {count > 0 && (
        <div className="border-t border-border px-5 py-3">
          <Link href={href}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90">
            {cta}
          </Link>
        </div>
      )}
    </section>
  )
}

function Spinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="size-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
    </div>
  )
}

function ErrState({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3">
      <XCircle className="size-7 text-destructive" />
      <p className="text-sm text-muted-foreground">{msg}</p>
      <button onClick={onRetry}
        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted">
        <RefreshCcw className="size-3" /> Réessayer
      </button>
    </div>
  )
}
