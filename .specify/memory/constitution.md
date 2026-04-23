# EtherEye Constitution

**Location**: `.specify/memory/constitution.md`

## 1. Technical Stack

- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS (Dark Mode only, Slate/Emerald palette)
- **State**: Zustand (for lightweight local state)
- **Visualization**: Framer Motion & Recharts

## 2. Coding Standards

- No `class` components; use Functional Components and Hooks only.
- Strict TypeScript: No `any` types.
- Components must be atomic and stored in `/src/components`.

## 3. Constraints

- The UI must be responsive for desktop use within VS Code's integrated browser.
- External API calls are forbidden except for OUI lookups (MAC address vendors).
