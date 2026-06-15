import type { LucideIcon } from 'lucide-react'
import { CreditCard } from 'lucide-react'

import { cn } from '@/lib/utils'

export type SidebarNavItem = {
  id: string
  label: string
  icon: LucideIcon
}

type DesktopSidebarProps = {
  items: SidebarNavItem[]
  activeId: string
  onNavigate?: (id: string) => void
  className?: string
}

export function DesktopSidebar({
  items,
  activeId,
  onNavigate,
  className,
}: DesktopSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/80 bg-surface-elevated/95 backdrop-blur-xl md:flex md:flex-col',
        className,
      )}
    >
      <div className="flex h-16 items-center gap-token-3 border-b border-border/80 px-token-6">
        <div className="flex size-10 items-center justify-center rounded-token-xl bg-brand-primary text-brand-primary-foreground shadow-sm">
          <CreditCard className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Financial Organizer
          </p>
          <p className="text-xs text-muted-foreground">Personal finance</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-token-1 p-token-4" aria-label="Main">
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
                'flex items-center gap-token-3 rounded-token-xl px-token-3 py-token-3 text-left text-sm font-medium transition-colors duration-normal ease-standard',
                isActive
                  ? 'bg-brand-primary text-brand-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
