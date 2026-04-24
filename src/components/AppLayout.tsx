import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const Motion = motion as any

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Scanline Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 scanlines scanlines-flicker"
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="border border-emerald-500/30 rounded-lg bg-slate-900/50 backdrop-blur-sm">
          <div className="border-b border-emerald-500/20 px-6 py-4">
            <h1 className="text-2xl font-bold text-emerald-400 tracking-tight">
              EtherEye Network Discovery
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Scan and monitor devices on your local network
            </p>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}