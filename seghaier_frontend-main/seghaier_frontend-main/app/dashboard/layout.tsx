'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, FileText, AlertCircle,
  Users, LogOut, Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { Logo } from '@/components/site/logo'

const NAV = [
  { href: '/dashboard',              label: 'Aperçu',       icon: LayoutDashboard, exact: true  },
  { href: '/dashboard/devis',        label: 'Devis',        icon: FileText,        exact: false },
  { href: '/dashboard/reclamations', label: 'Réclamations', icon: AlertCircle,     exact: false },
  { href: '/dashboard/clients',      label: 'Clients',      icon: Users,           exact: false },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) router.push('/admin/login')
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="size-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    )
  }

  const initials = (user.username ?? user.email ?? 'A').charAt(0).toUpperCase()

  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f2f0]">

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/25 backdrop-blur-[2px] md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col border-r border-border bg-background transition-transform duration-200 md:relative md:translate-x-0',
        open ? 'translate-x-0 shadow-xl' : '-translate-x-full',
      )}>
        {/* logo */}
        <div className="flex h-[60px] items-center gap-3 border-b border-border px-5">
          <Link href="/" className="flex items-center gap-2.5 text-foreground">
            <Logo />
          </Link>
          <span className="ml-auto rounded bg-brand-blue-light px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-brand-blue">
            Admin
          </span>
        </div>

        {/* navigation */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4">
          <p className="mb-1.5 px-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">
            Menu
          </p>
          <div className="space-y-0.5">
            {NAV.map((item) => {
              const Icon   = item.icon
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all duration-150',
                    active
                      ? 'bg-brand-blue text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className="size-[15px] shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* user footer */}
        <div className="border-t border-border px-2.5 py-3">
          <div className="mb-1.5 flex items-center gap-2.5 rounded-md bg-secondary px-3 py-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold leading-none">{user.username ?? 'Admin'}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { logout(); router.push('/') }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] text-muted-foreground transition-colors hover:bg-destructive/8 hover:text-destructive"
          >
            <LogOut className="size-3.5" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* mobile header */}
        <header className="flex h-[60px] items-center gap-3 border-b border-border bg-background px-4 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          >
            <Menu className="size-4" />
          </button>
          <span className="text-sm font-semibold">Tableau de bord</span>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
