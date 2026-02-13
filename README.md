# triviaboxd

A monorepo using Turborepo with pnpm workspaces.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev:next

# Build
pnpm build

# Lint
pnpm lint

# Format
pnpm format:fix
```

## Structure

```
apps/
  nextjs/       - Next.js 16 web app
packages/
  ui/           - Shared shadcn/ui components
  validators/   - Shared Zod schemas
tooling/
  eslint/       - ESLint configuration
  prettier/     - Prettier configuration
  tailwind/     - Tailwind CSS configuration
  typescript/   - TypeScript configuration
```

## Adding UI Components

```bash
pnpm ui-add
```
