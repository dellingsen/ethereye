# Quickstart: Network Discovery Dashboard

## Prerequisites

- Node.js 20+ installed
- npm available
- Existing Vite React project with TypeScript support

## Setup

1. Install frontend and backend dependencies:

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion express
```

2. Initialize Tailwind CSS if not already configured:

```bash
npx tailwindcss init -p
```

3. Configure `tailwind.config.js` to enable dark mode and set the color palette.

4. Add the backend bridge in `server/index.ts` and `server/routes/network.ts`.

5. Add the frontend network API service in `src/services/networkApi.ts`.

## Run

Start the backend server and the frontend app in parallel (two terminals):

```bash
node server/index.ts
npm run dev
```

Then open the Vite app in the browser and use the dashboard controls to scan the local network.

## Notes

- The backend bridge uses `arp -a` to discover local devices.
- The frontend renders results with Tailwind CSS and Framer Motion for the cyberpunk visual style.
- No external APIs are required for the scan itself.
