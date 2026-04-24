import type { ScanResult } from "../types/network";

const API_BASE_URL = "http://localhost:3001";

export class NetworkApi {
  static async getScanResults(): Promise<ScanResult> {
    const response = await fetch(`${API_BASE_URL}/api/scan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async triggerScan(): Promise<ScanResult> {
    const response = await fetch(`${API_BASE_URL}/api/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
