# Quickstart: Network Discovery Dashboard

## Prerequisites

- Node.js 20+ installed
- npm available
- Local network access for `arp -a` scan commands

## Setup

1. Install dependencies:

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion express
```

2. If Tailwind is not yet configured, initialize it:

```bash
npx tailwindcss init -p
```

3. Confirm `tailwind.config.js`, `postcss.config.js`, and `src/styles/tailwind.css` are present.

4. Confirm the backend bridge files exist:

- `server/index.ts`
- `server/scan.ts`
- `server/routes/network.ts`

5. Confirm the frontend API service exists at `src/services/networkApi.ts`.

## Run

Start the backend bridge in one terminal:

```bash
npm run dev:server
```

Start the frontend app in another terminal:

```bash
npm run dev
```

If you want to start the backend without watch mode:

```bash
npm run server
```

Open the Vite app in the browser and use the dashboard to scan the local network.

## Notes

- The backend exposes `http://localhost:3001/api/scan`.
- `GET /api/scan` and `POST /api/scan` both return structured device data.
- The app displays scan duration and timestamp for each refresh.
- The frontend uses Tailwind CSS and Framer Motion for the cyberpunk dashboard UI.
