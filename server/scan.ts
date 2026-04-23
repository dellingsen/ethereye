import { execSync } from "child_process";
import os from "os";

export interface ParsedDevice {
  ip: string;
  mac: string;
  hostname?: string;
  vendor?: string;
  type?: string;
  status: "online" | "offline" | "unknown";
  lastSeen: string;
  raw: string;
}

/**
 * Execute `arp -a` and parse the output into Device objects
 */
export function performNetworkScan(): ParsedDevice[] {
  try {
    const platform = os.platform();
    let arpOutput: string;

    if (platform === "darwin" || platform === "linux") {
      arpOutput = execSync("arp -a", { encoding: "utf-8" });
    } else if (platform === "win32") {
      arpOutput = execSync("arp -a", { encoding: "utf-8" });
    } else {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    return parseArpOutput(arpOutput);
  } catch (error) {
    console.error("[Scan] Error executing arp command:", error);
    return [];
  }
}

/**
 * Parse raw arp output into structured Device objects
 */
function parseArpOutput(arpOutput: string): ParsedDevice[] {
  const devices: ParsedDevice[] = new Map<string, ParsedDevice>();
  const lines = arpOutput.split("\n");

  for (const line of lines) {
    const match = line.match(
      /\((\d+\.\d+\.\d+\.\d+)\)\s+at\s+([0-9a-f:]{17})/i,
    );
    if (!match) continue;

    const ip = match[1];
    const mac = match[2].toUpperCase();

    // Skip if duplicate IP already exists
    if (devices.has(ip)) continue;

    const device: ParsedDevice = {
      ip,
      mac,
      status: "online",
      lastSeen: new Date().toISOString(),
      raw: line.trim(),
      type: inferDeviceType(line, ip),
    };

    devices.set(ip, device);
  }

  return Array.from(devices.values());
}

/**
 * Simple heuristic to infer device type from arp output or IP patterns
 */
function inferDeviceType(line: string, ip: string): string {
  const lineLower = line.toLowerCase();

  // Check for common device indicators in arp output
  if (
    lineLower.includes("router") ||
    lineLower.includes("gateway") ||
    lineLower.includes("bridge")
  ) {
    return "router";
  }

  // IP-based heuristics (commonly routers host .1)
  if (ip.endsWith(".1") || ip.endsWith(".254")) {
    return "router";
  }

  // Default to generic device
  return "device";
}
