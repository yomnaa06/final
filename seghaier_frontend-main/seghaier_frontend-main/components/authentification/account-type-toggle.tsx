'use client'

import { motion } from 'motion/react'
import { User, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AccountType = 'client' | 'societe'

const options = [
  { id: 'client'  as const, label: 'Particulier', icon: User      },
  { id: 'societe' as const, label: 'Société',     icon: Building2 },
]

export function AccountTypeToggle({
  value,
  onChange,
}: {
  value: AccountType
  onChange: (v: AccountType) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary p-1">
      {options.map((o) => {
        const active = value === o.id
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className="relative flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
          >
            {active && (
              <motion.span
                layoutId="account-type-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute inset-0 rounded-md bg-background shadow-sm ring-1 ring-border"
              />
            )}
            <span className={cn(
              'relative z-10 flex items-center gap-2 text-sm transition-colors',
              active ? 'text-foreground font-medium' : 'text-muted-foreground',
            )}>
              <o.icon className="size-3.5" strokeWidth={active ? 2 : 1.75} />
              {o.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
