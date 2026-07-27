'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  CheckCircle2, XCircle, Loader2, Search,
  Paperclip, X, FileText, ChevronDown, ChevronUp,
} from 'lucide-react'
import { devisApi, type Devis } from '@/lib/api'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

const STATUS: Record<string, { label: string; dot: string; text: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente', dot: 'bg-amber-400',   text: 'text-amber-800',   bg: 'bg-amber-50'   },
  VALIDE:     { label: 'Validé',     dot: 'bg-emerald-500', text: 'text-emerald-800', bg: 'bg-emerald-50' },
  REFUS:      { label: 'Refusé',     dot: 'bg-brand-red',   text: 'text-red-800',     bg: 'bg-red-50'     },
}

type Modal = { type: 'validate'; devis: Devis } | { type: 'refuse'; devis: Devis } | null

export default function AdminDevisPage() {
  const [list, setList]         = useState<Devis[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('ALL')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [modal, setModal]       = useState<Modal>(null)
  const [busy, setBusy]         = useState(false)
  const [toast, setToast]       = useState<{ msg: string; ok: boolean } | null>(null)
  const [file, setFile]         = useState<File | null>(null)
  const [desc, setDesc]         = useState('')
  const [motif, setMotif]       = useState('')
  const fileRef                 = useRef<HTMLInputElement>(null)

  const flash = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const load = useCallback(() => {
    setLoading(true)
    devisApi.listAll()
      .then((r) => setList(r.data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function handleValidate() {
    if (!modal || modal.type !== 'validate' || !file) return
    setBusy(true)
    try {
      const updated = await devisApi.validateWithFile(modal.devis.id, file, desc)
      setList((p) => p.map((d) => d.id === modal.devis.id ? updated.data : d))
      flash('Devis validé — pièce jointe envoyée.')
      setModal(null)
    } catch (e: unknown) { flash(e instanceof Error ? e.message : 'Erreur.', false) }
    finally { setBusy(false) }
  }

  async function handleRefuse() {
    if (!modal || modal.type !== 'refuse' || !motif.trim()) return
    setBusy(true)
    try {
      const updated = await devisApi.refuse(modal.devis.id, motif.trim())
      setList((p) => p.map((d) => d.id === modal.devis.id ? updated.data : d))
      flash('Devis refusé.')
      setModal(null)
    } catch (e: unknown) { flash(e instanceof Error ? e.message : 'Erreur.', false) }
    finally { setBusy(false) }
  }

  const filtered = list.filter((d) => {
    if (filter !== 'ALL' && d.statut !== filter) return false
    const q = search.toLowerCase()
    return !q || [d.client?.nom, d.brancheContact, d.produitDesire].some((v) => v?.toLowerCase().includes(q))
  })

  const counts = {
    total: list.length,
    pending: list.filter((d) => d.statut === 'EN_ATTENTE').length,
    validated: list.filter((d) => d.statut === 'VALIDE').length,
    refused: list.filter((d) => d.statut === 'REFUS').length,
  }

  return (
    <div className="space-y-6">

      {/* Toast */}
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
        <h1 className="mt-3 text-2xl font-semibold tracking-display">Gestion des devis</h1>
        <p className="mt-1 text-sm text-muted-foreground">Traitez les demandes de devis clients</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: 'Total',      value: counts.total,     key: 'ALL',        accent: 'text-foreground',    stripe: 'bg-foreground'       },
          { label: 'En attente', value: counts.pending,   key: 'EN_ATTENTE', accent: 'text-amber-700',     stripe: 'bg-amber-400'        },
          { label: 'Validés',    value: counts.validated, key: 'VALIDE',     accent: 'text-emerald-700',   stripe: 'bg-emerald-500'      },
          { label: 'Refusés',    value: counts.refused,   key: 'REFUS',      accent: 'text-red-700',       stripe: 'bg-red-500'          },
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client, branche, produit…"
          className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-background py-16 text-center">
          <FileText className="mb-3 size-9 text-muted-foreground/30" />
          <p className="text-sm font-medium">Aucun devis trouvé</p>
          <p className="mt-1 text-xs text-muted-foreground">Modifiez vos filtres ou attendez de nouvelles demandes.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                {['Client', 'Branche', 'Produit', 'Date', 'Statut', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((d) => (
                <>
                  <tr
                    key={d.id}
                    onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                    className="cursor-pointer transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium">{d.client?.nom ?? `#${d.clientId}`}</p>
                      {d.client?.telephone && <p className="mt-0.5 text-xs text-muted-foreground">{d.client.telephone}</p>}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{d.brancheContact}</td>
                    <td className="px-5 py-4 text-muted-foreground">{d.produitDesire}</td>
                    <td className="px-5 py-4 text-muted-foreground">{new Date(d.dateDemande).toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-4">
                      {STATUS[d.statut] && (
                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${STATUS[d.statut].bg} ${STATUS[d.statut].text}`}>
                          <span className={`size-1.5 rounded-full ${STATUS[d.statut].dot}`} />
                          {STATUS[d.statut].label}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {d.statut === 'EN_ATTENTE' && (
                          <>
                            <button
                              onClick={() => { setFile(null); setDesc(''); setModal({ type: 'validate', devis: d }) }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                            >
                              <CheckCircle2 className="size-3.5" /> Accepter
                            </button>
                            <button
                              onClick={() => { setMotif(''); setModal({ type: 'refuse', devis: d }) }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                            >
                              <XCircle className="size-3.5" /> Refuser
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                          className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                        >
                          {expanded === d.id ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expanded === d.id && (
                    <tr key={`${d.id}-exp`} className="bg-muted/20">
                      <td colSpan={6} className="px-5 py-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="label-eyebrow mb-1.5">Description</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{d.description || '—'}</p>
                          </div>
                          {d.motifRefus && (
                            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                              <p className="label-eyebrow mb-1.5 text-red-500">Motif de refus</p>
                              <p className="text-sm text-red-700">{d.motifRefus}</p>
                            </div>
                          )}
                          {d.documentUrl && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                              <p className="label-eyebrow mb-1.5 text-emerald-600">Document joint</p>
                              <a
                                href={`${API}${d.documentUrl}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
                              >
                                <FileText className="size-4" /> Voir le document
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Validate modal */}
      {modal?.type === 'validate' && (
        <ModalShell
          title="Valider le devis"
          subtitle={`${modal.devis.client?.nom ?? `#${modal.devis.clientId}`} · ${modal.devis.brancheContact}`}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Message au client <span className="text-muted-foreground/60 font-normal">(optionnel)</span>
              </label>
              <textarea
                value={desc} onChange={(e) => setDesc(e.target.value)} rows={3}
                placeholder="Votre devis est disponible en pièce jointe…"
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Pièce jointe <span className="text-destructive">*</span>
                <span className="ml-1.5 font-normal text-muted-foreground/60">PDF, DOC, DOCX — max 10 Mo</span>
              </label>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file ? (
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100">
                      <FileText className="size-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800">{file.name}</p>
                      <p className="text-xs text-emerald-600">{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                    </div>
                  </div>
                  <button onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = '' }}
                    className="text-emerald-600 hover:text-emerald-800"><X className="size-4" /></button>
                </div>
              ) : (
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-8 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
                  <Paperclip className="size-5" />
                  Cliquez pour sélectionner un fichier
                </button>
              )}
            </div>
          </div>
          <ModalFooter
            onCancel={() => setModal(null)} onConfirm={handleValidate}
            confirmLabel="Valider et envoyer" disabled={!file || busy} loading={busy}
            confirmCls="bg-emerald-600 text-white hover:bg-emerald-700"
          />
        </ModalShell>
      )}

      {/* Refuse modal */}
      {modal?.type === 'refuse' && (
        <ModalShell
          title="Refuser le devis"
          subtitle={modal.devis.client?.nom ?? `#${modal.devis.clientId}`}
          onClose={() => setModal(null)}
        >
          <div className="p-6">
            <label className="mb-1.5 block text-sm font-medium">
              Motif de refus <span className="text-destructive">*</span>
            </label>
            <textarea
              value={motif} onChange={(e) => setMotif(e.target.value)} rows={4}
              placeholder="Expliquez pourquoi cette demande ne peut pas être traitée…"
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
          </div>
          <ModalFooter
            onCancel={() => setModal(null)} onConfirm={handleRefuse}
            confirmLabel="Confirmer le refus" disabled={!motif.trim() || busy} loading={busy}
            confirmCls="bg-destructive text-white hover:bg-destructive/90"
          />
        </ModalShell>
      )}
    </div>
  )
}

function ModalShell({ title, subtitle, onClose, children }: {
  title: string; subtitle: string; onClose: () => void; children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <p className="font-semibold">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <button onClick={onClose} className="ml-4 rounded-lg p-1 text-muted-foreground hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ModalFooter({ onCancel, onConfirm, confirmLabel, disabled, loading, confirmCls }: {
  onCancel: () => void; onConfirm: () => void; confirmLabel: string
  disabled: boolean; loading: boolean; confirmCls: string
}) {
  return (
    <div className="flex gap-3 border-t border-border px-6 py-4">
      <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium transition-colors hover:bg-muted">
        Annuler
      </button>
      <button onClick={onConfirm} disabled={disabled}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${confirmCls}`}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        {loading ? 'Envoi…' : confirmLabel}
      </button>
    </div>
  )
}
