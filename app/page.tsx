'use client'

import { useState } from 'react'
import Image from 'next/image'
import ColorBends from '@/components/ColorBends'
import SpotlightCard from '@/components/SpotlightCard'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void (async () => {
      setIsSubmitting(true)
      setStatus({ type: 'idle' })
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
        if (!url || !key) {
          setStatus({
            type: 'error',
            message: 'Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).',
          })
          return
        }

        const res = await fetch(`${url}/functions/v1/waitlist-submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: key,
          },
          body: JSON.stringify({
            email,
            hp: '',
          }),
        })

        if (res.ok) {
          setStatus({ type: 'success', message: "Officially in the waiting list. You just saved your future self a lot of time." })
          setEmail('')
          return
        }

        const body = await res.json().catch(() => null)
        const err = body?.error ?? 'unknown_error'
        if (err === 'invalid_email') {
          setStatus({ type: 'error', message: 'Please enter a valid email address.' })
          return
        }
        if (err === 'rate_limited') {
          setStatus({ type: 'error', message: 'Too many attempts. Please try again in a bit.' })
          return
        }
        if (err === 'unauthorized') {
          setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
          return
        }
        if (err === 'server_misconfigured') {
          setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
          return
        }
        if (err === 'db_error') {
          setStatus({ type: 'error', message: `Error: User is too excited. (You're already signed up).` })
          return
        }
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    })()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background ColorBends */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <ColorBends
            rotation={45}
            speed={0.2}
            colors={["#7c9082","#f8f7f4"]}
            transparent={false}
            autoRotate={0.25}
            scale={0.1}
            frequency={1.4}
            warpStrength={0.9}
            mouseInfluence={0.2}
            parallax={0.2}
            noise={0.15}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <SpotlightCard
        className="w-full max-w-2xl rounded-[50px] border border-border bg-zinc-100 p-20 min-h-[360px] shadow-lg transition-transform duration-700 ease-out hover:scale-[1.02] relative z-10 overflow-hidden page-in-card"
        spotlightColor="rgba(255, 255, 255, 1.0)"
      >
        {/* Card background art (bottom-left) */}
        <div
          className="pointer-events-none absolute bottom-[-10px] left-[-70px] z-0 page-in-mountain"
        >
          <div
            className="mountain-float"
            style={{
              ['--mountain-opacity' as any]: 0.30,
              ['--mountain-float-delay' as any]: '1.8s',
            }}
          >
            <Image
              src="/assets_mountain.webp"
              alt=""
              width={460}
              height={560}
              className="mountain-art"
            />
          </div>
        </div>

        <div className="relative z-10">
        {/* Logo Area */}
        <div className="flex justify-center mb-6">
          <div className="logo-group page-in-logo">
            <div className="logo-scale">
              <div className="logo-badge">
              <Image
                src="/logo_button.svg"
                alt="Clariparse Logo Png"
                width={30}
                height={30}
                className="logo-img"
                priority
                unoptimized
              />
              </div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="page-in-heading">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-center mb-8 sm:mb-12 font-serif tracking-tight bg-gradient-to-b from-black/90 to-gray-500/70 bg-clip-text text-transparent transition-transform duration-500 ease-out hover:scale-[1.01]">
            Turn Clutter Into Clarity
          </h1>
        </div>

        {/* Email Input with Join Button */}
        <form onSubmit={handleSubmit}>
          <div className="page-in-input">
            <div
              className="relative transition-transform duration-300 ease-out hover:scale-[1.01] glass-shell"
              style={{
                ['--glass-alpha' as any]: 0.02,
                ['--glass-alpha-hover' as any]: 0.08,
                ['--glass-border-alpha' as any]: 0.12,
                ['--glass-border-alpha-hover' as any]: 0.18,
                ['--glass-blur' as any]: '2px',
                ['--glass-blur-hover' as any]: '3px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="relative z-10 w-full h-12 pl-4 pr-4 sm:pr-[150px] rounded-xl bg-transparent text-foreground placeholder:text-foreground/45 focus:outline-none focus:ring-1 focus:ring-ring"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="hidden sm:absolute sm:inset-y-1.5 sm:right-1.5 sm:inline-flex items-center justify-center leading-none z-10 tracking-wide px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:brightness-[1.03] active:brightness-[0.99] btn-shine whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? 'Joining…' : 'Join Waitlist'}
              </button>
            </div>

            {/* Mobile button (separate from input shell) */}
            <div className="mt-3 flex justify-center sm:hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center leading-none tracking-wide px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:brightness-[1.03] active:brightness-[0.99] btn-shine whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? 'Joining…' : 'Join Waitlist'}
              </button>
            </div>

            {/* Reserve space so layout doesn't jump; fade message in/out */}
            <div className="mt-2 sm:mt-3 min-h-[56px] sm:min-h-[20px] text-center" aria-live="polite">
              <p
                className={[
                  'text-sm sm:text-base leading-snug transition-all duration-700 ease-out',
                  status.type === 'idle' ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0',
                  status.type === 'error' ? 'text-destructive' : 'text-foreground/80',
                ].join(' ')}
              >
                {status.message ?? '\u00A0'}
              </p>
            </div>
          </div>
        </form>
        </div>
      </SpotlightCard>
    </main>
  )
}
