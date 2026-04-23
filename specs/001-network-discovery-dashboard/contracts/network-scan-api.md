# Contract: Network Scan API

## API Overview

Expose a local backend API for the frontend to request network scans and retrieve scan results.

### GET /api/scan

Starts or returns the latest scan result.

#### Response

- `200 OK`

```json
{
  "status": "completed",
  "scannedAt": "2026-04-23T15:00:00.000Z",
  "devices": [
    {
      "id": "00-11-22-33-44-55",
      "ip": "192.168.1.10",
      "hostname": "workstation.local",
      "mac": "00:11:22:33:44:55",
      "vendor": "ExampleVendor",
      "type": "computer",
      "status": "online",
      "lastSeen": "2026-04-23T15:00:00.000Z",
      "raw": "192.168.1.10 00:11:22:33:44:55"
    }
  ]
}
```

- `500 Internal Server Error`

```json
{
  "status": "error",
  "errorMessage": "Unable to execute network scan"
}
```

### POST /api/scan

Requests a fresh network scan.

#### Request Body

```json
{
  "force": true
}
```

#### Response

- `202 Accepted`

```json
{
  "status": "scanning",
  "progressMessage": "Scanning local network..."
}
```

## Device Schema

- `id`: string — unique identifier for UI rendering
- `ip`: string — IPv4 address
- `hostname`: string or null
- `mac`: string — MAC address
- `vendor`: string or null
- `type`: string or null
- `status`: `online` | `offline` | `unknown`
- `lastSeen`: string — ISO timestamp
- `raw`: string — raw scan output line
