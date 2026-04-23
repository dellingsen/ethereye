import React from 'react'
import { motion } from 'framer-motion'

interface NetworkRadarProps {
  isScanning: boolean
}

export const NetworkRadar: React.FC<NetworkRadarProps> = ({ isScanning }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        {/* Outer rings */}
        <motion.div
          className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"
          animate={isScanning ? {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: isScanning ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border border-emerald-400/30 rounded-full"
          animate={isScanning ? {
            scale: [1, 1.3, 1],
            opacity: [0.4, 0, 0.4],
          } : {}}
          transition={{
            duration: 2,
            repeat: isScanning ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Center radar */}
        <div className="w-32 h-32 bg-slate-800 border-2 border-emerald-500 rounded-full flex items-center justify-center relative overflow-hidden">
          {/* Radar sweep */}
          {isScanning && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
              }}
            />
          )}

          {/* Center dot */}
          <motion.div
            className="w-4 h-4 bg-emerald-400 rounded-full"
            animate={isScanning ? {
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isScanning ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* Status text */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <span className={`text-xs font-mono ${isScanning ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
              {isScanning ? 'SCANNING' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isScanning
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-700 text-slate-400'
            }`}>
            {isScanning ? 'Active Scan' : 'Standby'}
          </div>
        </div>
      </div>
    </div>
  )
}