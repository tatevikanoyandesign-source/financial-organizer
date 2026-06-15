import { useCallback, useEffect, useState } from 'react'

import {
  applyTheme,
  getInitialTheme,
  toggleTheme as flipTheme,
  type Theme,
} from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => flipTheme(current))
  }, [])

  return { theme, setTheme, toggleTheme }
}
