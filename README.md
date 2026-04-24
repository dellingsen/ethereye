# EtherEye Network Discovery

EtherEye is a local network discovery dashboard built with React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, and a small TypeScript backend bridge.

## Prerequisites

- Node.js 20+ installed
- npm available
- Local network access for `arp -a` scans

## Install

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion express
```

## Development

Start the backend bridge in one terminal:

```bash
npm run dev:server
```

Start the frontend app in another terminal:

```bash
npm run dev
```

For a one-time backend start without file watching:

```bash
npm run server
```

## Backend Bridge

- Backend entry: `server/index.ts`
- Scan logic: `server/scan.ts`
- API routes: `server/routes/network.ts`

The backend runs locally on `http://localhost:3001` and exposes `/api/scan`.

## Notes

- `GET /api/scan` and `POST /api/scan` return JSON device data with timings.
- Scan duration and last scan timestamp are shown in the front-end dashboard.
- The app uses Tailwind CSS and Framer Motion for cyberpunk styling and animated transitions.

## Build

```bash
npm run build
```
