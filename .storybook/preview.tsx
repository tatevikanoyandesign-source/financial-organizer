import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

import { applyTheme, type Theme } from '../src/lib/theme'

import '../src/index.css'

function ThemeWrapper({
  theme,
  children,
}: {
  theme: Theme
  children: React.ReactNode
}) {
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return <div className="min-h-svh bg-background text-foreground">{children}</div>
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme ?? 'light') as Theme

      return (
        <ThemeWrapper theme={theme}>
          <Story />
        </ThemeWrapper>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: [
          'Tokens',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows'],
          'UI',
          'Financial',
          'Layout',
          'Pages',
          ['Mobile', 'Desktop'],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
