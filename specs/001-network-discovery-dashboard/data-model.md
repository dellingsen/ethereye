# Data Model: Network Discovery Dashboard

## Entities

### Device

Represents a discovered device on the local network.

- `id`: string — Unique identifier for UI list keys (e.g. MAC or IP-based hash)
- `ip`: string — IPv4 address of the device
- `hostname`: string | null — Optional resolved hostname if available
- `mac`: string — MAC address of the device
- `vendor`: string | null — Optional vendor/OUI label if known
- `type`: string | null — Optional device classification (router, computer, IoT, printer, unknown)
- `status`: `online` | `offline` | `unknown`
- `lastSeen`: string — ISO timestamp when the device was discovered
- `raw`: string — Raw scan line for diagnostics and fallback parsing

### ScanState

Represents the current state of the network scan workflow.

- `status`: `idle` | `scanning` | `completed` | `error`
- `progressMessage`: string | null — user-facing status message
- `errorMessage`: string | null — error details if the scan fails
- `devices`: `Device[]`
- `scannedAt`: string | null — timestamp for latest scan

## Relationships

- A single `ScanState` contains zero or more `Device` entities.
- There is no persistent storage relationship; scan results are ephemeral and held in-memory.

## Validation rules

- `ip` MUST follow IPv4 format.
- `mac` MUST follow MAC address formatting patterns.
- `status` MUST be one of `idle`, `scanning`, `completed`, or `error`.
- `devices` list MAY be empty when no devices are found.
