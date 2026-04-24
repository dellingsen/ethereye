import { motion } from 'framer-motion'
import { useDeviceStore } from '../stores/deviceStore'
import { StatusBanner } from './StatusBanner'
import { ScanControls } from './ScanControls'
import { NetworkStats } from './NetworkStats'
import { DeviceList } from './DeviceList'

export const Dashboard: React.FC = () => {
  const { status, devices, progressMessage, errorMessage, scannedAt, scanDuration, triggerScan, refreshScan } = useDeviceStore()

  const isScanning = status === 'scanning'
  const hasDevices = devices.length > 0

  const handleScan = async () => {
    await triggerScan()
  }

  const handleRefresh = async () => {
    await refreshScan()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-950 bg-cyber-grid p-6 relative overflow-hidden"
    >
      {/* Animated background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-90"
        animate={{
          background: [
            "linear-gradient(45deg, #020617, #0f172a, #020617)",
            "linear-gradient(135deg, #020617, #0f172a, #020617)",
            "linear-gradient(225deg, #020617, #0f172a, #020617)",
            "linear-gradient(315deg, #020617, #0f172a, #020617)",
            "linear-gradient(45deg, #020617, #0f172a, #020617)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute inset-0 bg-matrix-rain opacity-20"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      ></motion.div>

      {/* Floating particles effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500 rounded-full opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
          }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl font-bold mb-4 tracking-wider relative"
            animate={{
              textShadow: [
                "0 0 10px rgba(34, 197, 94, 0.5)",
                "0 0 20px rgba(34, 197, 94, 0.8)",
                "0 0 30px rgba(34, 197, 94, 0.6)",
                "0 0 10px rgba(34, 197, 94, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              EtherEye
            </span>
          </motion.h1>
          <motion.p
            className="text-slate-400 text-xl font-mono tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            Network Discovery Dashboard
          </motion.p>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-4 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: 1.2,
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
          ></motion.div>
        </motion.div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 120,
            damping: 20
          }}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 25 }
          }}
          className="backdrop-blur-sm"
        >
          <StatusBanner scanState={{
            status,
            progressMessage,
            errorMessage,
            devices
          }} />
        </motion.div>

        {/* Scan Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 120,
            damping: 20
          }}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 25 }
          }}
          className="backdrop-blur-sm"
        >
          <ScanControls
            onScan={handleScan}
            onRefresh={handleRefresh}
            isScanning={isScanning}
            hasDevices={hasDevices}
          />
        </motion.div>

        {/* Network Stats */}
        {hasDevices && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 20
            }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 25 }
            }}
            className="backdrop-blur-sm"
          >
            <NetworkStats
              devices={devices}
              lastScanTime={scannedAt ? new Date(scannedAt) : undefined}
              scanDuration={scanDuration}
            />
          </motion.div>
        )}

        {/* Device List */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.0,
            type: "spring",
            stiffness: 120,
            damping: 20
          }}
          whileHover={{
            scale: 1.01,
            transition: { type: "spring", stiffness: 200, damping: 25 }
          }}
          className="backdrop-blur-sm"
        >
          <DeviceList
            devices={devices}
            isScanning={isScanning}
          />
        </motion.div>

        {/* Empty State */}
        {!isScanning && devices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="text-center py-16 backdrop-blur-sm bg-slate-900/30 rounded-lg border border-slate-800/50 relative overflow-hidden"
          >
            {/* Animated background for empty state */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5"
              animate={{
                x: [-100, 100],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="text-8xl mb-6 relative"
              animate={{
                textShadow: [
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                  "0 0 40px rgba(34, 197, 94, 0.6)",
                  "0 0 60px rgba(34, 197, 94, 0.4)",
                  "0 0 20px rgba(34, 197, 94, 0.3)"
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔍
            </motion.div>
            <motion.h3
              className="text-2xl text-slate-300 mb-4 font-mono tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              No Devices Found
            </motion.h3>
            <motion.p
              className="text-slate-500 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              Click "Scan Network" to discover devices on your local network.
            </motion.p>
            <motion.div
              className="text-sm text-slate-600 bg-slate-800/50 px-4 py-2 rounded font-mono inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: "spring" }}
            >
              Make sure your backend server is running on port 3001
            </motion.div>
          </motion.div>
        )}

        {/* Error State */}
        {status === 'error' && errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm shadow-neon-cyber relative overflow-hidden"
          >
            {/* Animated error background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"
              animate={{
                x: [-200, 200],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="flex items-center gap-4 relative">
              <motion.div
                className="text-red-400 text-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⚠️
              </motion.div>
              <div>
                <motion.h4
                  className="text-red-400 font-semibold text-xl font-mono tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Scan Error
                </motion.h4>
                <motion.p
                  className="text-red-300 text-base mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  {errorMessage}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}