# Geko DApp

Monorepo for Geko Application, built with [Turborepo](https://turbo.build/).

## Structure

```
geko-dapp/
├── apps/
│   └── web-app/          # Next.js web application
├── packages/
│   └── config/           # Shared ESLint, PostCSS, Tailwind, TypeScript config
├── turbo.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs all apps in development mode. The web app will be available at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Scripts

| Script                 | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start all apps in dev mode     |
| `npm run build`        | Build all packages and apps    |
| `npm run start`        | Start production servers       |
| `npm run lint`         | Run ESLint across all packages |
| `npm run format`       | Format code with Prettier      |
| `npm run format:check` | Check code formatting          |
