import { Bell, Search } from 'lucide-react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

type HeaderProps = {
  title: string
  subtitle?: string
  showSearch?: boolean
  theme?: Theme
  onToggleTheme?: () => void
  className?: string
}

export function Header({
  title,
  subtitle,
  showSearch = true,
  theme = 'light',
  onToggleTheme,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70',
        className,
      )}
    >
      <div className="flex flex-col gap-token-4 px-token-4 py-token-4 md:flex-row md:items-center md:justify-between md:px-token-6 md:py-token-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground md:hidden">
            Financial Organizer
          </p>
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-token-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-token-2 md:gap-token-3">
          {showSearch ? (
            <div className="relative hidden min-w-[16rem] flex-1 sm:block lg:min-w-[20rem]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search accounts, transactions..."
                className="h-10 rounded-token-xl bg-surface-muted/80 pl-9"
                aria-label="Search"
              />
            </div>
          ) : null}

          {onToggleTheme ? (
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          ) : null}

          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-token-xl"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
