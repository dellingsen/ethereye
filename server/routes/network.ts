import { IncomingMessage, ServerResponse } from "http";
import { performNetworkScan, ParsedDevice } from "../scan";
import { URL } from "url";

export interface ScanResult {
  status: "completed" | "error" | "scanning";
  devices: ParsedDevice[];
  errorMessage?: string;
  progressMessage?: string;
  scannedAt?: string;
}

export class Router {
  handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname === "/api/scan" && req.method === "GET") {
      this.handleGetScan(res);
    } else if (pathname === "/api/scan" && req.method === "POST") {
      this.handlePostScan(res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }

  private handleGetScan(res: ServerResponse): void {
    try {
      const devices = performNetworkScan();
      const result: ScanResult = {
        status: "completed",
        devices,
        scannedAt: new Date().toISOString(),
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const result: ScanResult = {
        status: "error",
        devices: [],
        errorMessage,
      };
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  }

  private handlePostScan(res: ServerResponse): void {
    try {
      // Trigger a fresh scan
      const devices = performNetworkScan();
      const result: ScanResult = {
        status: "completed",
        devices,
        scannedAt: new Date().toISOString(),
      };
      res.writeHead(202, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const result: ScanResult = {
        status: "error",
        devices: [],
        errorMessage,
      };
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  }
}
