import type { ReactNode } from 'react'

import { DesktopSidebar, type SidebarNavItem } from '@/components/layout/desktop-sidebar'
import { Header } from '@/components/layout/header'
import { MobileNav, type MobileNavItem } from '@/components/layout/mobile-nav'
import type { Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

type AppShellProps = {
  title: string
  subtitle?: string
  sidebarItems: SidebarNavItem[]
  mobileNavItems: MobileNavItem[]
  activeNavId: string
  onNavigate?: (id: string) => void
  theme?: Theme
  onToggleTheme?: () => void
  children: ReactNode
  className?: string
}

export function AppShell({
  title,
  subtitle,
  sidebarItems,
  mobileNavItems,
  activeNavId,
  onNavigate,
  theme,
  onToggleTheme,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn('min-h-svh bg-background text-foreground', className)}>
      <DesktopSidebar
        items={sidebarItems}
        activeId={activeNavId}
        onNavigate={onNavigate}
      />

      <div className="flex min-h-svh flex-col md:pl-64">
        <Header
          title={title}
          subtitle={subtitle}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <main
          className="flex-1 px-token-4 py-token-6 pb-[calc(var(--space-20)+env(safe-area-inset-bottom))] md:px-token-8 md:py-token-8 md:pb-token-8"
        >
          {children}
        </main>
      </div>

      <MobileNav
        items={mobileNavItems}
        activeId={activeNavId}
        onNavigate={onNavigate}
      />
    </div>
  )
}
