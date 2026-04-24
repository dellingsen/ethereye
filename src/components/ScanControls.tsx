import { motion } from 'framer-motion'

interface ScanControlsProps {
  onScan: () => void
  onRefresh: () => void
  isScanning: boolean
  hasDevices: boolean
}

export const ScanControls: React.FC<ScanControlsProps> = ({
  onScan,
  onRefresh,
  isScanning,
  hasDevices,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onScan}
        disabled={isScanning}
        className={`btn btn-primary ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isScanning ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="mr-2"
            >
              ⟳
            </motion.span>
            Scanning...
          </>
        ) : (
          <>
            <span className="mr-2">🔍</span>
            Scan Network
          </>
        )}
      </motion.button>

      {hasDevices && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRefresh}
          disabled={isScanning}
          className={`btn btn-secondary ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="mr-2">🔄</span>
          Refresh
        </motion.button>
      )}
    </div>
  )
}