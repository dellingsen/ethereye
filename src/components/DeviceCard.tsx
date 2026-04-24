import React from 'react'
import { motion } from 'framer-motion'
import { Device } from '../types/network'

interface DeviceCardProps {
  device: Device
  index: number
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, index }) => {
  const getDeviceIcon = (type?: string) => {
    switch (type) {
      case 'gateway':
        return '🌐'
      case 'computer':
        return '💻'
      case 'mobile':
        return '📱'
      case 'iot':
        return '🔌'
      case 'printer':
        return '🖨️'
      default:
        return '📡'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-emerald-400'
      case 'offline':
        return 'text-slate-500'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        delay: index * 0.25,
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
        filter: { duration: 0.4, delay: index * 0.25 }
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="card-hover group cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start gap-4 relative">
        {/* Status indicator */}
        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-emerald-500 shadow-neon-emerald animate-pulse"></div>

        <motion.div
          className="text-4xl relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {getDeviceIcon(device.type)}
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          ></motion.div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <motion.h3
              className="text-emerald-300 font-mono text-xl truncate group-hover:text-emerald-200 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25 + 0.3, duration: 0.3 }}
              whileHover={{ x: 2 }}
            >
              {device.hostname || device.ip}
            </motion.h3>
            <motion.span
              className={`text-sm font-bold px-2 py-1 rounded-full border ${getStatusColor(device.status)} border-current bg-current/10`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.25 + 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              {device.status.toUpperCase()}
            </motion.span>
          </div>

          <div className="space-y-2 text-sm">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25 + 0.5, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-slate-400 w-14 font-mono text-xs">IP:</span>
              <code className="text-emerald-300 font-mono bg-slate-800/50 px-2 py-1 rounded border border-emerald-500/30">
                {device.ip}
              </code>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25 + 0.6, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-slate-400 w-14 font-mono text-xs">MAC:</span>
              <code className="text-slate-400 font-mono bg-slate-800/30 px-2 py-1 rounded border border-slate-600/30">
                {device.mac}
              </code>
            </motion.div>
            {device.vendor && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.25 + 0.7, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-400 w-14 font-mono text-xs">Vendor:</span>
                <span className="text-slate-300 bg-slate-800/30 px-2 py-1 rounded border border-slate-600/30">
                  {device.vendor}
                </span>
              </motion.div>
            )}
            {device.type && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.25 + 0.8, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-400 w-14 font-mono text-xs">Type:</span>
                <span className="text-slate-300 bg-slate-800/30 px-2 py-1 rounded border border-slate-600/30 capitalize">
                  {device.type}
                </span>
              </motion.div>
            )}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25 + 0.9, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-slate-400 w-14 font-mono text-xs">Seen:</span>
              <span className="text-slate-500 text-xs bg-slate-800/30 px-2 py-1 rounded border border-slate-600/30">
                {new Date(device.lastSeen).toLocaleString()}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Data stream effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          delay: index * 0.25 + 0.5,
          duration: 0.8,
          ease: "easeOut"
        }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      ></motion.div>
    </motion.div>
  )
}