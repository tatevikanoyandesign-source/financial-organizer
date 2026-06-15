import { useState } from 'react'

import { AppShell } from '@/components/layout/app-shell'
import { useTheme } from '@/hooks/use-theme'
import { mobileNavItems, navItems } from '@/lib/mock-data'
import { getPageMeta, renderPage } from '@/pages/page-router'

function App() {
  const [activeNavId, setActiveNavId] = useState('overview')
  const { theme, toggleTheme } = useTheme()
  const pageMeta = getPageMeta(activeNavId)

  return (
    <AppShell
      title={pageMeta.title}
      subtitle={pageMeta.subtitle}
      sidebarItems={[...navItems]}
      mobileNavItems={[...mobileNavItems]}
      activeNavId={activeNavId}
      onNavigate={setActiveNavId}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      {renderPage(activeNavId)}
    </AppShell>
  )
}

export default App
