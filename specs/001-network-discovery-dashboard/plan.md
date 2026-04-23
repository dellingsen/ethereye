# Implementation Plan: Network Discovery Dashboard

**Branch**: `001-network-discovery-dashboard` | **Date**: April 23, 2026 | **Spec**: `specs/001-network-discovery-dashboard/spec.md`
**Input**: Feature specification from `/specs/001-network-discovery-dashboard/spec.md`

This plan defines a Vite React frontend with Tailwind CSS and Framer Motion, backed by a local Node.js server bridge that performs local network scans and exposes results to the UI via a simple API.

## Summary

Build a cyberpunk-themed network discovery dashboard that scans the local network from a Node.js backend bridge and displays discovered devices in the React frontend. The frontend uses Tailwind CSS for dark, neon styling and Framer Motion for animated transitions. The backend executes local `arp -a` scans, parses device entries, and returns JSON results through a small REST API.

## Technical Context

**Language/Version**: TypeScript 6+ for frontend and backend
**Primary Dependencies**:

- Frontend: React 19, Tailwind CSS, Framer Motion, Vite
- Backend: Node.js runtime, Express or native HTTP server, `child_process` for local scan execution
- Data/Service: browser `fetch` or Axios to call local backend API
  **Storage**: N/A (scan results held in-memory on the frontend and transiently on the backend)
  **Testing**: Vitest for frontend component and service tests; backend smoke tests with Node test runner or Supertest
  **Target Platform**: desktop web application in Vite, local Node.js backend on the same machine
  **Project Type**: web application with local backend bridge
  **Performance Goals**: complete scans within 30 seconds for typical home/office networks; maintain a responsive 60fps UI for device list animations
  **Constraints**: no external API calls except optional OUI lookup; must follow constitution styling and architecture rules; browser cannot scan the local network directly
  **Scale/Scope**: local network scan for home/office environments, up to 254 addressable devices

## Constitution Check

- React 18+/Vite: satisfied by current frontend stack and planned Vite integration.
- Tailwind CSS dark mode with slate/emerald palette: satisfied in planned UI styling.
- Framer Motion: included for polished animated device cards and scan transitions.
- Functional components with hooks only: planned frontend components follow this pattern.
- No external APIs except OUI lookups: satisfied by using local backend `arp -a`; vendor lookup can remain optional and local.
- Responsive desktop UI: planned layout targets desktop/VS Code browser dimensions.
- **Recharts**: Not required for this MVP. The feature focuses on displaying discovered devices as a list with animations, not visualizing data trends or statistics. Recharts can be added in a future phase if network analytics or device distribution charts are requested.

## Project Structure

### Documentation (this feature)

```text
specs/001-network-discovery-dashboard/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── network-scan-api.md
└── tasks.md
```

### Source Code (repository root)

```text
server/
├── index.ts
├── scan.ts
└── routes/
    └── network.ts
src/
├── components/
│   ├── Dashboard.tsx
│   ├── DeviceCard.tsx
│   ├── ScanControls.tsx
│   └── StatusBanner.tsx
├── services/
│   └── networkApi.ts
├── stores/
│   └── deviceStore.ts
├── App.tsx
├── main.tsx
└── styles/
    └── tailwind.css
```

**Structure Decision**: Keep the existing Vite React frontend in `src/` and add a dedicated `server/` directory for the Node.js scan bridge. This maintains the current repository layout while separating UI and backend responsibilities.

## Complexity Tracking

No constitution violations require formal justification for this feature.
