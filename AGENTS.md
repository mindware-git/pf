# PF Project Development Guide

## Dev environment tips
- Use `npm run dev` for development server
- Use `npm run build` for production build
- Use `npm run typecheck` for TypeScript validation
- Use `npm run test` to execute tests
- Check the name field inside each package's package.json to confirm the right name—skip the top-level one.

### React Router + Vite Setup
- Project uses React Router 7.10.1 + Vite 7.1.7
- Run `npm run dev` for development server
- Run `npm run build` for production build
- Run `npm run typecheck` for TypeScript validation
- Tailwind CSS 4.1.13 integrated via Vite plugin

### Test Setup
- Vitest 4.0.15 installed for testing
- Test files located in `test/` directory
- Run `pnpm test` to execute tests

## Component Development Patterns

### Timeline Component Architecture
- **Timeline.tsx**: Main container with state management
- **TimelineGrid.tsx**: Time-based grid with year/month/day ticks
- **ZoomControls.tsx**: Zoom controls with time unit buttons
- **EventMarkers.tsx**: Event visualization with filtering
- **TimelineBar.tsx**: Interactive timeline bar
- **EventDetails.tsx**: Selected event information display

### State Management Patterns
- Use `useState` for local component state
- Use `useMemo` for expensive calculations
- Filter events based on zoom level and importance
- Position calculations use date-based percentages

### Props Typing
- Define interfaces in `types/figure.ts`
- Use generic types for reusable components
- Import types consistently across components

## PR instructions
- Title format: [<project_name>] <Title>
- Always run `pnpm lint` and `pnpm test` before committing.
