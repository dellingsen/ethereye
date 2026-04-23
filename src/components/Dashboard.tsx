import React from 'react'
import { motion } from 'framer-motion'
import { useDeviceStore } from '../stores/deviceStore'
import { StatusBanner } from './StatusBanner'
import { ScanControls } from './ScanControls'
import { NetworkStats } from './NetworkStats'
import { DeviceList } from './DeviceList'

export const Dashboard: React.FC = () => {
  const { status, devices, progressMessage, errorMessage, triggerScan, fetchDevices } = useDeviceStore()

  const isScanning = status === 'scanning'
  const hasDevices = devices.length > 0

  const handleScan = async () => {
    await triggerScan()
  }

  const handleRefresh = async () => {
    await fetchDevices()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-950 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="neon-text">EtherEye</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Network Discovery Dashboard
          </p>
        </motion.div>

        {/* Status Banner */}
        <StatusBanner scanState={{
          status,
          progressMessage,
          errorMessage,
          devices
        }} />

        {/* Scan Controls */}
        <ScanControls
          onScan={handleScan}
          onRefresh={handleRefresh}
          isScanning={isScanning}
          hasDevices={hasDevices}
        />

        {/* Network Stats */}
        {hasDevices && (
          <NetworkStats
            devices={devices}
            lastScanTime={status === 'completed' ? new Date() : undefined}
          />
        )}

        {/* Device List */}
        <DeviceList
          devices={devices}
          isScanning={isScanning}
        />

        {/* Empty State */}
        {!isScanning && devices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-slate-300 mb-2">No Devices Found</h3>
            <p className="text-slate-500 mb-6">
              Click "Scan Network" to discover devices on your local network.
            </p>
            <div className="text-sm text-slate-600">
              Make sure your backend server is running on port 3001
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {status === 'error' && errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="text-red-400 text-xl">⚠️</div>
              <div>
                <h4 className="text-red-400 font-semibold">Scan Error</h4>
                <p className="text-red-300 text-sm">{errorMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}