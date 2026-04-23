import { create } from "zustand";
import { Device, ScanState } from "../types/network";
import { NetworkApiService } from "../services/networkApi";

interface DeviceStore extends ScanState {
  fetchDevices: () => Promise<void>;
  triggerScan: () => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  status: "idle",
  devices: [],
  progressMessage: undefined,
  errorMessage: undefined,
  scannedAt: undefined,

  fetchDevices: async () => {
    set({ status: "scanning", progressMessage: "Fetching scan results..." });

    try {
      const result = await NetworkApiService.getScanResults();

      set({
        status: result.status,
        devices: result.devices,
        progressMessage: undefined,
        errorMessage: result.errorMessage,
        scannedAt: result.scannedAt,
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
    set({ status: "scanning", progressMessage: "Scanning network..." });

    try {
      const result = await NetworkApiService.triggerScan();

      set({
        status: result.status,
        devices: result.devices,
        progressMessage: undefined,
        errorMessage: result.errorMessage,
        scannedAt: result.scannedAt,
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
}));
