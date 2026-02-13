# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Guidelines

- Never add Claude attribution or co-authored-by mentions in git commits or code comments
- All git commit messages and comments should be lowercase, unless uppercase is necessary to reference something by its actual name (e.g. package names like Next.js, filenames like README.md)

## Build & Development Commands

```bash
# Development
pnpm dev              # Run all apps in watch mode
pnpm dev:next         # Run only Next.js app

# Building & Type Checking
pnpm build            # Build all packages (Turborepo cached)
pnpm typecheck        # Type check all packages

# Linting & Formatting
pnpm lint             # Lint all code
pnpm lint:fix         # Fix linting issues
pnpm format           # Check formatting
pnpm format:fix       # Fix formatting

# UI Components
pnpm ui-add           # Add shadcn/ui components interactively
```

## Architecture

This is a Turborepo monorepo using pnpm workspaces.

### Apps (`apps/`)

- **nextjs/** - Next.js 16 web app, uses App Router

### Shared Packages (`packages/`)

- **ui/** - Shared shadcn/ui components
- **validators/** - Shared Zod schemas

### Tooling (`tooling/`)

Shared configs for ESLint, Prettier, Tailwind, and TypeScript extended by all packages.

## Key Patterns

### Adding UI Components

Run `pnpm ui-add` to add shadcn/ui components to `packages/ui/src/`

## Convex

When working with Convex code, read `.cursor/rules/convex_rules.mdc` for patterns and conventions.

## Tech Stack

- TypeScript 5.9 (strict mode), React 19, Next.js 16
- Tailwind CSS v4, shadcn/ui
- Zod v4 for validation
