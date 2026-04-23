import React from 'react'
import { motion } from 'framer-motion'
import { ScanState } from '../types/network'

interface StatusBannerProps {
  scanState: ScanState
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ scanState }) => {
  const getStatusConfig = () => {
    switch (scanState.status) {
      case 'scanning':
        return {
          bgClass: 'bg-emerald-500/20 border-emerald-500/30',
          textClass: 'text-emerald-400',
          icon: '⟳',
          message: scanState.progressMessage || 'Scanning network...',
        }
      case 'completed':
        return {
          bgClass: 'bg-green-500/20 border-green-500/30',
          textClass: 'text-green-400',
          icon: '✓',
          message: `Scan completed - ${scanState.devices.length} devices found`,
        }
      case 'error':
        return {
          bgClass: 'bg-red-500/20 border-red-500/30',
          textClass: 'text-red-400',
          icon: '✗',
          message: scanState.errorMessage || 'Scan failed',
        }
      default:
        return {
          bgClass: 'bg-slate-700',
          textClass: 'text-slate-400',
          icon: '○',
          message: 'Ready to scan',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`scan-status ${config.bgClass}`}
    >
      <motion.span
        animate={scanState.status === 'scanning' ? { rotate: 360 } : {}}
        transition={{
          duration: 2,
          repeat: scanState.status === 'scanning' ? Infinity : 0,
          ease: 'linear',
        }}
        className="text-lg mr-2"
      >
        {config.icon}
      </motion.span>
      <span className="font-medium">{config.message}</span>
      {scanState.scannedAt && (
        <span className="text-xs opacity-75 ml-4">
          {new Date(scanState.scannedAt).toLocaleTimeString()}
        </span>
      )}
    </motion.div>
  )
}