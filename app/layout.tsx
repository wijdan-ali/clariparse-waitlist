import type { Metadata } from 'next'
import { antic } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clariparse - Join the Waitlist',
  description: 'Join the waitlist for Clariparse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={antic.variable}>
      <body>{children}</body>
    </html>
  )
}
