# pf

## Development Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

## Deployment Modes

This project supports 3 deployment modes:

### 1. Development Mode
```bash
npm run dev
```
- Base path: `/`
- SSR: Enabled
- URL: `http://localhost:5173/`

### 2. GitHub Pages (Static Deployment)
```bash
npm run build:static
npm run serve:static
```
- Base path: `/pf/`
- SSR: Disabled (SPA mode)
- Local testing: Opens `http://localhost:8000/pf/`
- GitHub Actions automatically deploys to `https://mindware-git.github.io/pf/`

### 3. Dynamic Deployment (Node.js Server)
```bash
npm run build
npm run start
```
- Base path: `/`
- SSR: Enabled
- Requires Node.js server
- Suitable for platforms like Vercel, Railway, etc.

## Build

Production build:
```bash
npm run build
```

Type check:
```bash
npm run typecheck
```

Run tests:
```bash
npm test
```

## Project Structure

- `app/` - React Router application code
- `app/routes/` - Page routes
- `app/components/` - Reusable components
- `app/services/` - Data services
- `app/types/` - TypeScript type definitions
- `public/` - Static assets
- `test/` - Test files
- `build/` - Output directory after build (not tracked in git)