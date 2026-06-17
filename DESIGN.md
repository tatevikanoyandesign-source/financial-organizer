# Design System — Financial Organizer

## Product
A responsive web financial organizer (PWA direction, TBD).
Works on iPhone Safari, Android Chrome, and desktop browsers.
NOT a native iOS app.

## Visual Direction
- Apple-inspired: clean, premium, calm, trustworthy
- Style quality reference: wealthy_ai_three_screen_clickable.html
- Grayscale only during prototyping — no brand colors yet
- When brand color is added later: dark gray + lime green

## Typography
- Font stack: `--font-family-sans` — `-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `SF Pro Display`, `system-ui`, `sans-serif`
- Mono: `--font-family-mono` — `ui-monospace`, `SF Mono`, `SFMono-Regular`, `Menlo`, `monospace`
- Apple Dynamic Type roles (web/PWA visual reference):

| Role | Token prefix | Size | Weight | Tracking | Line height |
|------|--------------|------|--------|----------|-------------|
| Large Title | `--type-large-title-*` | 34px (2.125rem) | 700 | -0.4px | 1.12 |
| Title 1 | `--type-title-1-*` | 28px (1.75rem) | 700 | -0.3px | 1.15 |
| Title 2 | `--type-title-2-*` | 22px (1.375rem) | 700 | -0.2px | 1.2 |
| Title 3 | `--type-title-3-*` | 20px (1.25rem) | 600 | -0.1px | 1.25 |
| Headline | `--type-headline-*` | 17px (1.0625rem) | 600 | 0 | 1.35 |
| Body | `--type-body-*` | 17px (1.0625rem) | 400 | 0 | 1.47 |
| Callout | `--type-callout-*` | 16px (1rem) | 400 | 0 | 1.45 |
| Subhead | `--type-subhead-*` | 15px (0.9375rem) | 400 | 0 | 1.45 |
| Footnote | `--type-footnote-*` | 13px (0.8125rem) | 400 | 0 | 1.4 |
| Caption | `--type-caption-*` | 12px (0.75rem) | 400 | 0.1px | 1.35 |

- Legacy size aliases: `--font-size-xs` (caption) through `--font-size-5xl` (large title)
- Financial amounts: `text-3xl font-bold` minimum (`--font-size-3xl` = Title 1 / 28px)
- Labels below amounts: `text-sm text-muted-foreground` (`--font-size-sm` = footnote / 13px)
- Clean hierarchy: never more than 3 levels on one screen

## Spacing
- Apple 8pt grid tokens:

| Token | Value |
|-------|-------|
| `--space-xs` | 4px (0.25rem) |
| `--space-sm` | 8px (0.5rem) |
| `--space-md` | 16px (1rem) |
| `--space-lg` | 20px (1.25rem) |
| `--space-xl` | 24px (1.5rem) |
| `--space-2xl` | 32px (2rem) |
| `--space-3xl` | 48px (3rem) |

- Page margins: `--page-margin-mobile` 16px, `--page-margin-tablet` 20px, `--page-margin-desktop` 32px
- Touch target minimum (mobile web): `--touch-target-min` 44px (2.75rem)
- Mobile: 16px (`p-4` / `--space-md`) padding inside cards, 16px (`gap-4`) between sections
- Desktop: 24px (`p-6` / `--space-xl`) padding inside cards, 24px (`gap-6`) between sections
- Never hardcode pixel values — use token scale only

## Radius
- Apple precise corners (web/PWA visual reference):

| Token | Value |
|-------|-------|
| `--radius-none` | 0 |
| `--radius-xs` | 4px (0.25rem) |
| `--radius-sm` | 8px (0.5rem) |
| `--radius-md` | 12px (0.75rem) |
| `--radius-lg` | 16px (1rem) |
| `--radius-xl` | 20px (1.25rem) |
| `--radius-full` | 9999px |

- Cards: `--radius-lg`. Buttons and inputs: `--radius-md`.

## Shadows
- Apple soft layered elevation (web/PWA):

| Token | Value |
|-------|-------|
| `--shadow-none` | none |
| `--shadow-xs` | `0 1px 1px rgba(0,0,0,0.04)` |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 2px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.08)` |
| `--shadow-lg` | `0 4px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.1)` |
| `--shadow-inner` | `inset 0 1px 2px rgba(0,0,0,0.06)` |

- Cards: `--shadow-sm`. Dark mode uses stronger rgba values (see `shadows.css`).

## Components
- Always built on shadcn/ui primitives
- Card → every section is a Card with CardContent
- Button → all actions, chips, pill buttons
- Input → all text inputs
- Badge → tags, labels, schedule references
- Separator → between date groups and sections

## Storybook Structure
Tokens/ → UI/ → Layout/ → Financial/ → Pages/Mobile/ → Pages/Desktop/
Each story must be visually distinct — no duplicate-looking stories.

## Screen Structure (from prototype fip-v6_2.html)
- Home tab: entity switcher, AI chat prompt, account tiles,
  streak badges, smart alerts, budget snapshot, activity feed
- Vault tab: header, entity filters, document list, upload FAB
- Tax tab: filing readiness, checklists, TaxAct CTA, tax strategy
- Onboarding: 5 pre-app screens (build last)

## What NOT to do
- No custom div styling when shadcn component exists
- No hardcoded colors or pixel values
- No pushing to GitHub without designer confirmation
- No building more than one section at a time without approval
- No duplicate Storybook stories
