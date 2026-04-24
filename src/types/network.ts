export interface Device {
  id: string;
  ip: string;
  hostname?: string;
  mac: string;
  vendor?: string;
  type?: string;
  status: "online" | "offline" | "unknown";
  lastSeen: string;
  raw: string;
}

export interface ScanState {
  status: "idle" | "scanning" | "completed" | "error";
  progressMessage?: string;
  errorMessage?: string;
  devices: Device[];
  scannedAt?: string;
  scanDuration?: number;
}

export interface ScanResult {
  status: ScanState["status"];
  devices: Device[];
  errorMessage?: string;
  progressMessage?: string;
  scannedAt?: string;
  scanDuration?: number;
}
