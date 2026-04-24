import { motion } from 'framer-motion'
import type { Device } from '../types/network'
import { DeviceCard } from './DeviceCard'

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
      <div className="terminal-content max-h-96 overflow-y-auto space-y-2">
        {devices.map((device, index) => (
          <DeviceCard
            key={`${device.ip}-${device.mac}`}
            device={device}
            index={index}
          />
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