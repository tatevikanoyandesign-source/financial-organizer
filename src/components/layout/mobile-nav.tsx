import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type MobileNavItem = {
  id: string
  label: string
  icon: LucideIcon
}

type MobileNavProps = {
  items: MobileNavItem[]
  activeId: string
  onNavigate?: (id: string) => void
  className?: string
}

export function MobileNav({
  items,
  activeId,
  onNavigate,
  className,
}: MobileNavProps) {
  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 backdrop-blur-xl md:hidden',
        className,
      )}
      aria-label="Mobile"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-token-1 px-token-2 py-token-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex min-h-[var(--touch-target-min)] flex-col items-center justify-center gap-token-1 rounded-token-xl px-token-1 py-token-2 text-[length:var(--type-caption-size)] font-[number:var(--type-headline-weight)] transition-colors duration-normal ease-standard',
                isActive
                  ? 'bg-surface-muted text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <Icon className={cn('size-5', isActive && 'text-foreground')} />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
