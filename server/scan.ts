import { execSync } from "child_process";
import os from "os";

export interface ParsedDevice {
  id: string;
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
  const devices = new Map<string, ParsedDevice>();
  const lines = arpOutput.split("\n");

  for (const line of lines) {
    // Try Windows format first: IP MAC TYPE
    let match = line.match(
      /^\s*(\d+\.\d+\.\d+\.\d+)\s+([0-9a-f-]{17})\s+(\w+)/i,
    );
    if (match) {
      const ip = match[1];
      const mac = match[2].replace(/-/g, ":").toUpperCase(); // Convert dashes to colons

      if (devices.has(ip)) continue;

      const device: ParsedDevice = {
        id: `${ip}-${mac}`,
        ip,
        mac,
        status: "online",
        lastSeen: new Date().toISOString(),
        raw: line.trim(),
        type: inferDeviceType(line, ip),
      };

      devices.set(ip, device);
      continue;
    }

    // Try Unix format: hostname (ip) at mac [ether] on interface
    match = line.match(
      /(.+?)\s*\((\d+\.\d+\.\d+\.\d+)\)\s+at\s+([0-9a-f:]{17})/i,
    );
    if (match) {
      const hostname = match[1].trim();
      const ip = match[2];
      const mac = match[3].toUpperCase();

      if (devices.has(ip)) continue;

      const device: ParsedDevice = {
        id: `${ip}-${mac}`,
        ip,
        mac,
        hostname: hostname !== "?" ? hostname : undefined,
        status: "online",
        lastSeen: new Date().toISOString(),
        raw: line.trim(),
        type: inferDeviceType(line, ip),
      };

      devices.set(ip, device);
    }
  }

  return Array.from(devices.values());
}

/**
 * Simple heuristic to infer device type from arp output or IP patterns
 */
function inferDeviceType(line: string, ip: string): string {
  const lineLower = line.toLowerCase();

  if (
    lineLower.includes("router") ||
    lineLower.includes("gateway") ||
    lineLower.includes("bridge") ||
    lineLower.includes("default gateway")
  ) {
    return "gateway";
  }

  if (
    lineLower.includes("phone") ||
    lineLower.includes("android") ||
    lineLower.includes("iphone") ||
    lineLower.includes("ipad") ||
    lineLower.includes("mobile")
  ) {
    return "mobile";
  }

  if (lineLower.includes("printer") || lineLower.includes("print")) {
    return "printer";
  }

  if (ip.endsWith(".1") || ip.endsWith(".254")) {
    return "gateway";
  }

  return "computer";
}
