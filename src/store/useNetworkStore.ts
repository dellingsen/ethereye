import { create } from "zustand";
import { Device } from "../types/network";

interface NetworkStore {
  devices: Device[];
  isScanning: boolean;
  error: string | null;
  lastScannedAt: string | null;
  fetchScanResults: () => Promise<void>;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  devices: [],
  isScanning: false,
  error: null,
  lastScannedAt: null,

  fetchScanResults: async () => {
    set({ isScanning: true, error: null });

    try {
      const response = await fetch("http://localhost:3001/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.errorMessage || "Scan failed");
      }

      set({
        devices: result.devices || [],
        isScanning: false,
        error: null,
        lastScannedAt: result.scannedAt || new Date().toISOString(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      set({
        isScanning: false,
        error: errorMessage,
      });
    }
  },
}));
