import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden"
      animate={{
        opacity: [0.97, 1, 0.98, 1, 0.99, 1],
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* Scanline Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50 scanlines scanlines-flicker"
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          className="border border-emerald-500/30 rounded-lg bg-slate-900/50 backdrop-blur-sm shadow-neon-emerald-lg"
          initial={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 30px rgba(34, 197, 94, 0.5)",
              "0 0 25px rgba(34, 197, 94, 0.4)",
              "0 0 20px rgba(34, 197, 94, 0.3)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  )
}