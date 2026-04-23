import React from 'react'
import { motion } from 'framer-motion'
import { Device } from '../types/network'

interface DeviceListProps {
  devices: Device[]
  isScanning: boolean
}

export const DeviceList: React.FC<DeviceListProps> = ({ devices, isScanning }) => {
  if (devices.length === 0 && !isScanning) {
    return (
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="text-emerald-400">Network Devices</span>
        </div>
        <div className="terminal-content">
          <div className="text-slate-400 text-center py-8">
            No devices found. Click "Scan Network" to discover devices.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="text-emerald-400">Network Devices ({devices.length})</span>
      </div>
      <div className="terminal-content max-h-96 overflow-y-auto">
        {devices.map((device, index) => (
          <motion.div
            key={`${device.ip}-${device.mac}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="device-entry"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="device-icon">
                  {device.type === 'gateway' ? '🌐' : '💻'}
                </div>
                <div>
                  <div className="text-emerald-300 font-mono">{device.ip}</div>
                  <div className="text-slate-400 text-sm font-mono">{device.mac}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-300 text-sm">{device.hostname || 'Unknown'}</div>
                <div className="text-slate-500 text-xs">{device.vendor || 'Unknown Vendor'}</div>
              </div>
            </div>
          </motion.div>
        ))}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="device-entry scanning"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="device-icon"
              >
                ⟳
              </motion.div>
              <div className="text-emerald-400">Scanning network...</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}