'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  Loader2, Search, Send, CheckCircle2,
  XCircle, X, MessageSquare, ChevronDown, ChevronUp,
} from 'lucide-react'
import { reclamationApi, type Reclamation } from '@/lib/api'

const STATUS: Record<string, { label: string; dot: string; text: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente', dot: 'bg-amber-400',   text: 'text-amber-800',   bg: 'bg-amber-50'   },
  TRAITE:     { label: 'Traité',     dot: 'bg-emerald-500', text: 'text-emerald-800', bg: 'bg-emerald-50' },
}

export default function AdminReclamationsPage() {
  const [list, setList]         = useState<Reclamation[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('ALL')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [replyId, setReplyId]   = useState<number | null>(null)
  const [reponse, setReponse]   = useState('')
  const [busy, setBusy]         = useState(false)
  const [toast, setToast]       = useState<{ msg: string; ok: boolean } | null>(null)

  const flash = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const load = useCallback(() => {
    setLoading(true)
    reclamationApi.listAll()
      .then((r) => setList(r.data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleProcess() {
    if (!replyId || !reponse.trim()) return
    setBusy(true)
    try {
      const updated = await reclamationApi.process(replyId, reponse.trim())
      setList((p) => p.map((r) => r.id === replyId ? updated.data : r))
      flash('Réclamation traitée.')
      setReplyId(null)
      setReponse('')
    } catch (e: unknown) {
      flash(e instanceof Error ? e.message : 'Erreur.', false)
    } finally { setBusy(false) }
  }

  const filtered = list.filter((r) => {
    if (filter !== 'ALL' && r.statut !== filter) return false
    const q = search.toLowerCase()
    return !q || [r.client?.nom, r.sujet, r.destinataire].some((v) => v?.toLowerCase().includes(q))
  })

  const counts = {
    total:   list.length,
    pending: list.filter((r) => r.statut === 'EN_ATTENTE').length,
    treated: list.filter((r) => r.statut === 'TRAITE').length,
  }

  const replyRec = list.find((r) => r.id === replyId)

  return (
    <div className="space-y-6">

      {toast && (
        <div className={`fixed right-6 top-6 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-medium shadow-lg ${
          toast.ok ? 'bg-foreground text-background' : 'bg-destructive text-white'
        }`}>
          {toast.ok ? <CheckCircle2 className="size-4 shrink-0" /> : <XCircle className="size-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      <div>
        <p className="label-eyebrow">Administration</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-display">Gestion des réclamations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Répondez aux réclamations de vos clients</p>
      </div>

      {/*  kpi */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Total',      value: counts.total,   key: 'ALL',        accent: 'text-foreground',  stripe: 'bg-foreground'  },
          { label: 'En attente', value: counts.pending, key: 'EN_ATTENTE', accent: 'text-amber-700',   stripe: 'bg-amber-400'   },
          { label: 'Traités',    value: counts.treated, key: 'TRAITE',     accent: 'text-emerald-700', stripe: 'bg-emerald-500' },
        ].map((k) => (
          <button
            key={k.key}
            onClick={() => setFilter(k.key)}
            className={`group flex overflow-hidden rounded-lg border text-left transition-all ${
              filter === k.key
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background hover:border-foreground/25 hover:bg-secondary/60'
            }`}
          >
            <div className={`w-1 shrink-0 transition-colors ${filter === k.key ? 'bg-white/30' : k.stripe}`} />
            <div className="flex-1 px-4 py-3.5">
              <p className={`text-2xl font-semibold tracking-display ${filter === k.key ? 'text-background' : k.accent}`}>{k.value}</p>
              <p className={`mt-0.5 text-[11px] ${filter === k.key ? 'text-background/55' : 'text-muted-foreground'}`}>{k.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Client, sujet, destinataire…"
          className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-background py-16 text-center">
          <MessageSquare className="mb-3 size-9 text-muted-foreground/30" />
          <p className="text-sm font-medium">Aucune réclamation trouvée</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                {['Client', 'Sujet', 'Destinataire', 'Date', 'Statut', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <React.Fragment key={r.id}>
                  <tr
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                    className="cursor-pointer transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium">{r.client?.nom ?? `#${r.clientId}`}</p>
                      {r.client?.telephone && <p className="mt-0.5 text-xs text-muted-foreground">{r.client.telephone}</p>}
                    </td>
                    <td className="max-w-[180px] px-5 py-4">
                      <p className="truncate text-muted-foreground">{r.sujet}</p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.destinataire}</td>
                    <td className="px-5 py-4 text-muted-foreground">{new Date(r.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-4">
                      {STATUS[r.statut] && (
                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${STATUS[r.statut].bg} ${STATUS[r.statut].text}`}>
                          <span className={`size-1.5 rounded-full ${STATUS[r.statut].dot}`} />
                          {STATUS[r.statut].label}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {r.statut !== 'TRAITE' && (
                          <button
                            onClick={() => { setReponse(r.reponseAdmin ?? ''); setReplyId(r.id) }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/20 hover:bg-muted"
                          >
                            <Send className="size-3.5" /> Répondre
                          </button>
                        )}
                        <button
                          onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                          className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                        >
                          {expanded === r.id ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expanded === r.id && (
                    <tr className="bg-muted/20">
                      <td colSpan={6} className="px-5 py-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="label-eyebrow mb-1.5">Description</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                          </div>
                          {r.reponseAdmin && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                              <p className="label-eyebrow mb-1.5 text-emerald-600">Réponse envoyée</p>
                              <p className="text-sm text-emerald-800">{r.reponseAdmin}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* repondre */}
      {replyId !== null && replyRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            <div className="flex items-start justify-between border-b border-border px-6 py-4">
              <div>
                <p className="font-semibold">Répondre à la réclamation</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {replyRec.client?.nom ?? `#${replyRec.clientId}`} · {replyRec.sujet}
                </p>
              </div>
              <button onClick={() => setReplyId(null)} className="ml-4 rounded-lg p-1 text-muted-foreground hover:bg-muted">
                <X className="size-4" />
              </button>
            </div>

            <div className="mx-6 mt-5 rounded-xl border border-border bg-muted/40 p-4">
              <p className="label-eyebrow mb-1.5">Réclamation du client</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{replyRec.description}</p>
            </div>

            <div className="p-6">
              <label className="mb-1.5 block text-sm font-medium">
                Votre réponse <span className="text-destructive">*</span>
              </label>
              <textarea
                value={reponse} onChange={(e) => setReponse(e.target.value)} rows={5}
                placeholder="Rédigez votre réponse. Elle sera visible dans l'espace client."
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="flex gap-3 border-t border-border px-6 py-4">
              <button
                onClick={() => setReplyId(null)}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Annuler
              </button>
              <button
                onClick={handleProcess}
                disabled={!reponse.trim() || busy}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {busy ? 'Envoi…' : 'Envoyer la réponse'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
