# Tasks: Network Discovery Dashboard

**Input**: Design documents from `/specs/001-network-discovery-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline configuration for frontend and backend.

- [x] T001 Create backend scaffold in `server/index.ts`, `server/scan.ts`, and `server/routes/network.ts`
- [x] T002 Add dependencies in `package.json` for `express`, `zustand`, `framer-motion`, `tailwindcss`, `postcss`, and `autoprefixer`
- [x] T003 Create Tailwind CSS configuration in `tailwind.config.js` and `postcss.config.js`
- [x] T004 Create Tailwind entry stylesheet in `src/styles/tailwind.css` and import it from `src/index.css`
- [x] T005 Create frontend network type definitions in `src/types/network.ts` for `Device` and `ScanState`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the backend scan bridge, API contract, and frontend state/service plumbing that all stories depend on.

- [ ] T006 Implement backend scan parser in `server/scan.ts` to execute `arp -a` and return parsed device rows
- [ ] T007 Implement local API routes in `server/routes/network.ts` for `GET /api/scan` and `POST /api/scan`
- [ ] T008 Implement Node.js server startup and route registration in `server/index.ts`
- [ ] T009 Implement frontend API client in `src/services/networkApi.ts` to request scans and fetch results
- [ ] T010 Create Zustand device store in `src/stores/deviceStore.ts` to manage scan state, devices, and errors
- [ ] T011 Create scan status UI in `src/components/StatusBanner.tsx` for progress, success, and error states
- [ ] T012 Create scan control UI in `src/components/ScanControls.tsx` for scan and refresh actions

---

## Phase 3: User Story 1 - Scan and Display Network Devices (Priority: P1)

**Goal**: Enable the user to scan the local network and view discovered devices with key details.

**Independent Test**: Run the app, start a scan, and confirm discovered devices render with IP, hostname, and type.

- [ ] T013 [US1] Create `src/components/DeviceCard.tsx` to render individual device details
- [ ] T014 [US1] Create `src/components/Dashboard.tsx` to render scan controls, status, and device list
- [ ] T015 [US1] Create `src/App.tsx` to render the dashboard and apply global layout
- [ ] T016 [US1] Integrate the network API client into `src/stores/deviceStore.ts` for live scans
- [ ] T017 [US1] Add empty-state feedback and error messaging in `src/components/Dashboard.tsx`

---

## Phase 4: User Story 2 - Cyberpunk UI Theme (Priority: P1)

**Goal**: Apply the cyberpunk/Matrix visual design using Tailwind CSS and Framer Motion.

**Independent Test**: Verify the app uses dark neon styling, glowing card effects, and motion transitions.

- [ ] T018 [P] [US2] Configure cyberpunk styling in `tailwind.config.js` and `src/index.css`
- [ ] T019 [US2] Style the dashboard layout in `src/components/Dashboard.tsx`
- [ ] T020 [US2] Style device cards in `src/components/DeviceCard.tsx` with neon hover states
- [ ] T021 [US2] Add Framer Motion animations in `src/components/DeviceCard.tsx` and `src/components/Dashboard.tsx`

---

## Phase 5: User Story 3 - Refresh Scan (Priority: P2)

**Goal**: Allow the user to refresh the network scan and update the displayed device list.

**Independent Test**: Click the refresh button and confirm the app triggers a new scan and updates results.

- [ ] T022 [P] [US3] Add a refresh control in `src/components/ScanControls.tsx`
- [ ] T023 [US3] Implement refresh scan logic in `src/stores/deviceStore.ts`
- [ ] T024 [US3] Display updated scan timestamp and refreshed results in `src/components/Dashboard.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, documentation, and validation across frontend and backend.

- [ ] T025 [P] Validate SC-001: Measure and confirm network scan completes within 30 seconds for networks with up to 50 devices
- [ ] T026 [P] Validate SC-002: Measure and confirm dashboard UI loads and displays initial state within 2 seconds
- [ ] T027 [P] Validate SC-003: Test and confirm system discovers at least 80% of devices present on a typical home/office network
- [ ] T028 [P] Validate SC-004: Verify users can identify device types and key information for 95% of discovered devices
- [ ] T029 [P] Update `specs/001-network-discovery-dashboard/quickstart.md` with exact install and run steps for the backend bridge
- [ ] T030 [P] Update `specs/001-network-discovery-dashboard/contracts/network-scan-api.md` with final request/response examples if implementation differs
- [ ] T031 [P] Verify TypeScript types and clean up unused imports in `src/` and `server/`
- [ ] T032 [P] Add a backend startup script or README note in `package.json`

---

## Dependencies & Execution Order

- Phase 1 Setup must complete before Phase 2 Foundational.
- Phase 2 Foundational must complete before User Story phases begin.
- User Story phases can proceed in parallel after Foundational is done.
- Phase 6 Polish depends on completion of all user stories.

### Story Dependencies

- **US1**: Depends on Phase 2 Foundational; no dependency on other stories.
- **US2**: Depends on Phase 2 Foundational; can be developed alongside US1.
- **US3**: Depends on Phase 2 Foundational; can be developed alongside US1 and US2.

## Parallel Opportunities

- T002, T003, T004, and T005 can run in parallel during Phase 1.
- T018 and T021 can run in parallel during Phase 4 because they target different styling files.
- T022 and T025–T028 can run in parallel as polish and refresh implementation are separate.

## Implementation Strategy

1. Finish Phase 1 Setup, then complete Phase 2 Foundational.
2. Deliver User Story 1 first as the MVP.
3. Add cyberpunk UI styling in User Story 2.
4. Add scan refresh in User Story 3.
5. Finish with Phase 6 Polish, documentation, and type cleanup.
