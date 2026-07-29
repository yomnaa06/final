'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type BaseProps = {
  label: string
  error?: string
  hint?: string
  containerClassName?: string
}

export const FloatingInput = React.forwardRef<
  HTMLInputElement,
  BaseProps & React.InputHTMLAttributes<HTMLInputElement>
>(function FloatingInput({ label, error, hint, className, containerClassName, id, ...props }, ref) {
  const autoId   = React.useId()
  const fieldId  = id ?? autoId

  return (
    <div className={cn('group relative', containerClassName)}>
      <input
        ref={ref} id={fieldId} placeholder=" "
        aria-invalid={!!error}
        className={cn(
          'peer h-14 w-full rounded-lg border border-input bg-background px-4 pt-5 pb-1.5 text-sm text-foreground outline-none transition-all duration-150',
          'placeholder:text-transparent',
          'hover:border-foreground/25',
          'focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/12',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/10',
          className,
        )}
        {...props}
      />
      <label
        htmlFor={fieldId}
        className={cn(
          'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-150',
          'peer-focus:top-[11px] peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-medium peer-focus:text-brand-blue',
          'peer-[:not(:placeholder-shown)]:top-[11px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-muted-foreground',
          'peer-aria-[invalid=true]:peer-focus:text-destructive',
        )}
      >
        {label}
      </label>
      {error ? (
        <p className="mt-1.5 pl-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 pl-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
})

export const FloatingPassword = React.forwardRef<
  HTMLInputElement,
  BaseProps & React.InputHTMLAttributes<HTMLInputElement>
>(function FloatingPassword({ label, error, hint, className, id, ...props }, ref) {
  const [show, setShow] = React.useState(false)
  const autoId          = React.useId()
  const fieldId         = id ?? autoId

  return (
    <div className="group relative">
      <input
        ref={ref} id={fieldId} type={show ? 'text' : 'password'} placeholder=" "
        aria-invalid={!!error}
        className={cn(
          'peer h-14 w-full rounded-lg border border-input bg-background px-4 pt-5 pb-1.5 pr-12 text-sm text-foreground outline-none transition-all duration-150',
          'placeholder:text-transparent',
          'hover:border-foreground/25',
          'focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/12',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/10',
          className,
        )}
        {...props}
      />
      <label
        htmlFor={fieldId}
        className={cn(
          'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-150',
          'peer-focus:top-[11px] peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-medium peer-focus:text-brand-blue',
          'peer-[:not(:placeholder-shown)]:top-[11px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-muted-foreground',
        )}
      >
        {label}
      </label>
      <button
        type="button" onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Masquer' : 'Afficher'}
        className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
      {error && <p className="mt-1.5 pl-1 text-xs text-destructive">{error}</p>}
      {!error && hint && <p className="mt-1.5 pl-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
})

export const FloatingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function FloatingTextarea({ label, error, hint, className, id, ...props }, ref) {
  const autoId  = React.useId()
  const fieldId = id ?? autoId

  return (
    <div className="group relative">
      <textarea
        ref={ref} id={fieldId} placeholder=" "
        aria-invalid={!!error}
        className={cn(
          'peer w-full rounded-lg border border-input bg-background px-4 pt-6 pb-3 text-sm text-foreground outline-none transition-all duration-150',
          'placeholder:text-transparent',
          'hover:border-foreground/25',
          'focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/12',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/10',
          className,
        )}
        {...props}
      />
      <label
        htmlFor={fieldId}
        className={cn(
          'pointer-events-none absolute left-4 top-[15px] text-sm text-muted-foreground transition-all duration-150',
          'peer-focus:top-[9px] peer-focus:text-[10.5px] peer-focus:font-medium peer-focus:text-brand-blue',
          'peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-muted-foreground',
        )}
      >
        {label}
      </label>
      {error ? (
        <p className="mt-1.5 pl-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 pl-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
})
