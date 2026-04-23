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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{getDeviceIcon(device.type)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-emerald-300 font-mono text-lg truncate">
              {device.hostname || device.ip}
            </h3>
            <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
              {device.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-12">IP:</span>
              <code className="text-emerald-300 font-mono">{device.ip}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-12">MAC:</span>
              <code className="text-slate-400 font-mono">{device.mac}</code>
            </div>
            {device.vendor && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-12">Vendor:</span>
                <span className="text-slate-300">{device.vendor}</span>
              </div>
            )}
            {device.type && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-12">Type:</span>
                <span className="text-slate-300 capitalize">{device.type}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 w-12">Seen:</span>
              <span className="text-slate-500 text-xs">
                {new Date(device.lastSeen).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}