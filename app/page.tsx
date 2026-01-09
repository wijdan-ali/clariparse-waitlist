'use client'

import { useState } from 'react'
import Image from 'next/image'
import ColorBends from '@/components/ColorBends'
import SpotlightCard from '@/components/SpotlightCard'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend functionality for now
    console.log('Email submitted:', email)
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
        className="w-full max-w-2xl rounded-[50px] border border-border bg-background p-20 min-h-[360px] shadow-lg transition-transform duration-700 ease-out hover:scale-[1.02] relative z-10 overflow-hidden page-in-card"
        spotlightColor="rgba(181, 181, 181, 0.2)"
      >
        {/* Card background art (bottom-left) */}
        <div
          className="pointer-events-none absolute bottom-[-10px] left-[-70px] z-0 mountain-float page-in-mountain"
          style={{
            ['--mountain-opacity' as any]: 0.16,
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

        <div className="relative z-10">
        {/* Logo Area */}
        <div className="flex justify-center mb-6">
          <div className="logo-group page-in-logo">
            <div className="logo-scale">
              <div className="logo-badge">
              <Image
                src="/logo_button.webp"
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
          <h1 className="text-[35px] font-bold text-center mb-12 font-serif tracking-tight bg-gradient-to-b from-black/90 to-gray-500/70 bg-clip-text text-transparent transition-transform duration-500 ease-out hover:scale-[1.01]">
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
                className="relative z-10 w-full h-12 pl-4 pr-[150px] rounded-xl bg-transparent text-foreground placeholder:text-foreground/45 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 z-10 tracking-wide px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:brightness-[1.03] active:brightness-[0.99] btn-shine whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </form>
        </div>
      </SpotlightCard>
    </main>
  )
}
