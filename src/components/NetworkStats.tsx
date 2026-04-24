import React from 'react'
import { motion } from 'framer-motion'
import { Device } from '../types/network'

interface NetworkStatsProps {
  devices: Device[]
  lastScanTime?: Date
  scanDuration?: number
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({
  devices,
  lastScanTime,
  scanDuration,
}) => {
  const totalDevices = devices.length
  const gatewayCount = devices.filter(d => d.type === 'gateway').length
  const deviceCount = totalDevices - gatewayCount

  const stats = [
    { label: 'Total Devices', value: totalDevices, icon: '📊' },
    { label: 'Network Devices', value: deviceCount, icon: '💻' },
    { label: 'Gateways', value: gatewayCount, icon: '🌐' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}

      {lastScanTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card md:col-span-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <div className="text-lg text-emerald-400">
                  Last Scan: {lastScanTime.toLocaleTimeString()}
                </div>
                {scanDuration && (
                  <div className="text-sm text-slate-400">
                    Duration: {scanDuration.toFixed(2)}s
                  </div>
                )}
              </div>
            </div>
            <div className="text-slate-500 text-sm">
              {lastScanTime.toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}