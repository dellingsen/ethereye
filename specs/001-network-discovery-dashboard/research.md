# Research: Network Discovery Dashboard

## Decision: Backend Bridge for Local Scanning

- **Chosen**: Use a local Node.js backend bridge to execute network scanning commands such as `arp -a` and return parsed results to the React frontend via a simple REST API.
- **Rationale**: Browsers cannot access local network scanning tools due to sandbox restrictions, so the only feasible solution for a local Vite React app is a backend process running on the same machine.
- **Alternatives considered**:
  - Browser-only discovery via Web APIs: not possible for local ARP/ICMP scanning.
  - WebAssembly/native modules inside the browser: still blocked by browser security.
  - Remote scanning service: violates the requirement for local network discovery and introduces unnecessary external dependency.

## Decision: Use `arp -a` for initial device discovery

- **Chosen**: Use `arp -a` as the first pass for device discovery because it is widely available on most OSes and returns a list of local IP/MAC mappings.
- **Rationale**: `arp -a` is lightweight, does not require additional external dependencies, and can be safely executed from Node.js.
- **Alternatives considered**:
  - `nmap` or advanced network tools: too heavy for a lightweight app and not guaranteed to be installed.
  - ICMP ping sweep from Node: possible, but `arp -a` is simpler and sufficient for an MVP.

## Decision: Cyberpunk UI with Tailwind + Framer Motion

- **Chosen**: Implement the frontend UI using Tailwind CSS for dark, neon styling and Framer Motion for device card animations.
- **Rationale**: This matches the constitution and user requirements while keeping the UI implementation maintainable.
- **Alternatives considered**:
  - Pure CSS animations: simpler but less expressive than Framer Motion.
  - A different design system: unnecessary when Tailwind already fits the requirement.

## Decision: Local API contract

- **Chosen**: Expose a simple `/api/scan` endpoint that accepts scan requests and returns JSON device data.
- **Rationale**: A minimal API keeps integration simple and makes the frontend/backend separation clear.
- **Alternatives considered**:
  - WebSocket streaming: not necessary for the MVP; REST polling is simpler and sufficient.
