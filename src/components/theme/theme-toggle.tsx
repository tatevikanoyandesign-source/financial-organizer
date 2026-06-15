import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Theme } from '@/lib/theme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10 rounded-token-xl"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
