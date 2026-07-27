'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ArrowUpRight, User, LayoutDashboard, LogOut, History } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/site'
import { Logo } from './logo'
import { useAuth } from '@/lib/auth-context'

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!accountOpen) return
    const h = () => setAccountOpen(false)
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [accountOpen])

  const light = overlay && !scrolled
  const isAdmin = user?.role === 'ADMIN'
  const displayName = user ? (isAdmin ? user.username ?? user.email : user.nom ?? user.email) : null

  function handleLogout() {
    logout(); setAccountOpen(false); setOpen(false); router.push('/')
  }

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      scrolled || !overlay
        ? 'border-b border-border bg-white/95 shadow-sm backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent',
    )}>
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link href="/" aria-label="Seghaier Auto Parts">
          <Logo />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                'group relative text-sm font-medium transition-colors duration-200',
                light ? 'text-white/80 hover:text-white' : 'text-foreground/60 hover:text-foreground',
              )}>
              {l.label}
              <span className={cn(
                'absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full',
                light ? 'bg-white' : 'bg-brand-blue',
              )} />
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2.5 md:flex">
          {!isLoading && user ? (
            <>
              <div className="relative">
                <button type="button"
                  onClick={(e) => { e.stopPropagation(); setAccountOpen(v => !v) }}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                    light
                      ? 'text-white/80 hover:text-white'
                      : 'text-foreground/70 hover:bg-brand-blue-light hover:text-brand-blue',
                  )}>
                  <div className={cn(
                    'flex size-7 items-center justify-center rounded-full text-xs font-bold ring-2',
                    light
                      ? 'bg-white/20 text-white ring-white/30'
                      : 'bg-brand-blue text-white ring-brand-blue/20',
                  )}>
                    {(displayName ?? '?')[0].toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{displayName}</span>
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      onClick={e => e.stopPropagation()}
                      className="absolute right-0 top-full mt-2.5 w-52 overflow-hidden rounded-xl border border-border bg-white py-1.5 shadow-xl shadow-brand-blue/8"
                    >
                      {isAdmin ? (
                        <Link href="/dashboard" onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-brand-blue-light hover:text-brand-blue">
                          <LayoutDashboard className="size-3.5" />Tableau de bord
                        </Link>
                      ) : (
                        <>
                          <Link href="/history" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-brand-blue-light hover:text-brand-blue">
                            <History className="size-3.5" />Mes demandes
                          </Link>
                          <Link href="/profile" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-brand-blue-light hover:text-brand-blue">
                            <User className="size-3.5" />Mon profil
                          </Link>
                        </>
                      )}
                      <div className="my-1 h-px bg-border" />
                      <button type="button" onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-brand-red transition-colors hover:bg-brand-red-light">
                        <LogOut className="size-3.5" />Se déconnecter
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isAdmin && (
                <Link href="/devis"
                  className={cn(
                    'group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
                    light
                      ? 'bg-white text-brand-blue hover:bg-white/90'
                      : 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/25',
                  )}>
                  Demander un devis
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </>
          ) : !isLoading ? (
            <>
              <Link href="/login"
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  light ? 'text-white/80 hover:text-white' : 'text-foreground/60 hover:text-foreground',
                )}>
                Se connecter
              </Link>
              <Link href="/devis"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-blue/25 transition-all duration-200 hover:bg-brand-blue/90">
                Demander un devis
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button type="button" onClick={() => setOpen(v => !v)} aria-label="Menu"
          className={cn('md:hidden inline-flex size-9 items-center justify-center rounded-lg transition-colors',
            light ? 'text-white' : 'text-foreground hover:bg-brand-blue-light')}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-white md:hidden"
          >
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-brand-blue-light hover:text-brand-blue">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                {user ? (
                  <>
                    {isAdmin
                      ? <Link href="/dashboard" onClick={() => setOpen(false)}
                          className="rounded-lg bg-brand-blue-light px-4 py-2.5 text-center text-sm font-semibold text-brand-blue">
                          Tableau de bord
                        </Link>
                      : <>
                          <Link href="/history" onClick={() => setOpen(false)}
                            className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium">
                            Mes demandes
                          </Link>
                          <Link href="/devis" onClick={() => setOpen(false)}
                            className="rounded-lg bg-brand-blue px-4 py-2.5 text-center text-sm font-semibold text-white">
                            Demander un devis
                          </Link>
                        </>
                    }
                    <button type="button" onClick={handleLogout}
                      className="rounded-lg border border-brand-red/20 px-4 py-2.5 text-center text-sm font-medium text-brand-red">
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}
                      className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium">
                      Se connecter
                    </Link>
                    <Link href="/devis" onClick={() => setOpen(false)}
                      className="rounded-lg bg-brand-blue px-4 py-2.5 text-center text-sm font-semibold text-white">
                      Demander un devis
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
