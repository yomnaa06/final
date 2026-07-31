'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stepper({
  steps,
  current,
}: {
  steps: string[]
  current: number
}) {
  return (
    <ol className="flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'relative flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-300',
                  done
                    ? 'border-accent bg-accent text-accent-foreground'
                    : active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden text-sm font-medium transition-colors duration-300 sm:block',
                  active || done ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative mx-1 h-px flex-1 bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
