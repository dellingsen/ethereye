import { create } from "zustand";
import type { ScanState } from "../types/network";
import { NetworkApiService } from "../services/networkApi";

interface DeviceStore extends ScanState {
  fetchDevices: () => Promise<void>;
  triggerScan: () => Promise<void>;
  refreshScan: () => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  status: "idle",
  devices: [],
  progressMessage: undefined,
  errorMessage: undefined,
  scannedAt: undefined,
  scanDuration: undefined,

  fetchDevices: async () => {
    const scanStart = Date.now();
    set({
      status: "scanning",
      progressMessage: "Fetching latest scan results...",
    });

    try {
      const result = await NetworkApiService.getScanResults();
      const duration = (Date.now() - scanStart) / 1000;

      set({
        status: result.status,
        devices: result.devices,
        progressMessage: undefined,
        errorMessage: result.errorMessage,
        scannedAt: result.scannedAt,
        scanDuration: result.scanDuration ?? duration,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch devices";
      set({
        status: "error",
        errorMessage,
        progressMessage: undefined,
      });
    }
  },

  triggerScan: async () => {
    const scanStart = Date.now();
    set({ status: "scanning", progressMessage: "Scanning network..." });

    try {
      const result = await NetworkApiService.triggerScan();
      const duration = (Date.now() - scanStart) / 1000;

      set({
        status: result.status,
        devices: result.devices,
        progressMessage: undefined,
        errorMessage: result.errorMessage,
        scannedAt: result.scannedAt,
        scanDuration: result.scanDuration ?? duration,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Scan failed";
      set({
        status: "error",
        errorMessage,
        progressMessage: undefined,
      });
    }
  },

  refreshScan: async () => {
    const scanStart = Date.now();
    set({ status: "scanning", progressMessage: "Refreshing scan..." });

    try {
      const result = await NetworkApiService.triggerScan();
      const duration = (Date.now() - scanStart) / 1000;

      set({
        status: result.status,
        devices: result.devices,
        progressMessage: undefined,
        errorMessage: result.errorMessage,
        scannedAt: result.scannedAt,
        scanDuration: result.scanDuration ?? duration,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Refresh failed";
      set({
        status: "error",
        errorMessage,
        progressMessage: undefined,
      });
    }
  },
}));
