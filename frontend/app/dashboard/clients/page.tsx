'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Search, User, Building2 } from 'lucide-react'
import { adminApi, type Client } from '@/lib/api'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('ALL')

  const load = useCallback(() => {
    setLoading(true)
    adminApi.getClients()
      .then((r) => setClients(r.data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = clients.filter((c) => {
    if (filter !== 'ALL' && c.clientType !== filter) return false
    const q = search.toLowerCase()
    return !q || [c.nom, c.prenom, c.user?.email, c.telephone, c.ville].some((v) => v?.toLowerCase().includes(q))
  })

  return (
    <div className="space-y-6">
      <div>
        <p className="label-eyebrow">Administration</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-display">
          Clients
          <span className="ml-3 text-lg font-normal text-muted-foreground">{clients.length}</span>
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom, e-mail, téléphone, ville…"
            className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>
        <div className="flex gap-2">
          {([['ALL', 'Tous'], ['INDIVIDUEL', 'Particuliers'], ['SOCIETE', 'Sociétés']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`rounded-md border px-3.5 py-2 text-xs font-medium transition-colors ${
                filter === val
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background py-16 text-center text-sm text-muted-foreground">
          Aucun client trouvé.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                {['Client', 'Type', 'E-mail', 'Téléphone', 'Ville', 'Inscrit le'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        {c.clientType === 'SOCIETE'
                          ? <Building2 className="size-4 text-muted-foreground" />
                          : <User className="size-4 text-muted-foreground" />}
                      </div>
                      <div>
                        <p className="font-medium">
                          {c.clientType === 'INDIVIDUEL' ? `${c.nom} ${c.prenom ?? ''}`.trim() : c.nom}
                        </p>
                        {c.matriculeFiscal && (
                          <p className="text-xs text-muted-foreground">{c.matriculeFiscal}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-medium ${
                      c.clientType === 'SOCIETE'
                        ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                        : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                    }`}>
                      {c.clientType === 'SOCIETE' ? 'Société' : 'Particulier'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{c.user?.email}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.telephone ?? '—'}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.ville ?? '—'}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {c.user?.dateCreation ? new Date(c.user.dateCreation).toLocaleDateString('fr-FR') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
