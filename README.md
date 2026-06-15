# Financial Organizer

A responsive design system and web app for personal finance, built with React, Tailwind CSS v4, shadcn/ui, and Storybook.

## Quick start

```bash
npm install
npm run dev        # App at http://localhost:5173
npm run storybook  # Components at http://localhost:6006
```

## Project structure

| Folder | Purpose |
| --- | --- |
| `src/styles/tokens/` | Design tokens (colors, type, spacing, motion) |
| `src/components/ui/` | Base shadcn components (Button, Card, Input) |
| `src/components/layout/` | App shell, header, sidebar, mobile nav |
| `src/components/financial/` | Finance-specific components |
| `src/pages/` | App screens (Overview, Accounts, Budgets, etc.) |
| `src/design-system/` | Token preview for Storybook |

## Rebrand later

Edit the `--brand-*` values in `src/styles/tokens/colors.css`. Components pick up changes automatically through semantic tokens.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the app locally |
| `npm run build` | Production build |
| `npm run storybook` | Component documentation |
| `npm run lint` | Check code quality |
| `npx shadcn@latest add badge` | Add a new shadcn component |
