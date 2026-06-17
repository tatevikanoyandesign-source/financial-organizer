import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'

import type { ComponentType, ReactNode } from 'react'
import { ArgTypes, Description, Source, Title } from '@storybook/addon-docs/blocks'

import { cn } from '@/lib/utils'

type PreviewWidth = 'card' | 'form' | 'wide' | 'full' | 'layout' | 'mobile'

type DocSectionConfig = {
  title: string
  description: string
  code: string
  render: () => ReactNode
  width?: PreviewWidth
}

const previewWidthClasses: Record<PreviewWidth, string> = {
  card: 'mx-auto w-full max-w-[420px] min-w-[280px]',
  form: 'mx-auto w-full max-w-[420px] min-w-[280px]',
  wide: 'mx-auto w-full max-w-2xl min-w-[320px]',
  full: 'w-full min-w-0',
  layout: 'w-full min-w-0',
  mobile: 'mx-auto w-full max-w-[390px] min-w-[320px]',
}

function DocPage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-10 px-6 py-8">
      {children}
    </div>
  )
}

function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function DocPreview({
  children,
  width = 'card',
}: {
  children: ReactNode
  width?: PreviewWidth
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className={cn('w-full', previewWidthClasses[width])}>{children}</div>
    </div>
  )
}

function DocApiHeading() {
  return (
    <h2 className="doc-api mb-4 mt-12 border-t border-border pt-10 text-xl font-semibold tracking-tight text-foreground">
      Api
    </h2>
  )
}

function renderDocOverview(sections: DocSectionConfig[]) {
  return (
    <DocPage>
      {sections.map((section) => (
        <DocSection
          key={section.title}
          title={section.title}
          description={section.description}
        >
          <DocPreview width={section.width}>{section.render()}</DocPreview>
        </DocSection>
      ))}
    </DocPage>
  )
}

function createComponentDocPage(
  component: ComponentType<any>,
  _description: string,
  sections: DocSectionConfig[],
) {
  return function ComponentDocPage() {
    return (
      <>
        <Title />
        <Description />
        <DocPage>
          {sections.map((section) => (
            <DocSection
              key={section.title}
              title={section.title}
              description={section.description}
            >
              <DocPreview width={section.width}>{section.render()}</DocPreview>
              <Source code={section.code} language="tsx" dark />
            </DocSection>
          ))}
        </DocPage>
        <DocApiHeading />
        <ArgTypes of={component} />
      </>
    )
  }
}

function createDocsOnlyStory(sections: DocSectionConfig[]) {
  return {
    render: () => renderDocOverview(sections),
  }
}

function PageFrame({
  children,
  variant = 'mobile',
}: {
  children: ReactNode
  variant?: 'mobile' | 'desktop'
}) {
  if (variant === 'mobile') {
    return (
      <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-xl border border-border bg-background">
        <div className="p-4">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border bg-background p-6">
      {children}
    </div>
  )
}

function DarkPreview({ children }: { children: ReactNode }) {
  return <div className="dark rounded-lg bg-background text-foreground">{children}</div>
}

import { AppShell } from './app-shell'
import { getPageMeta, mobileNavItems, navItems } from '@/lib/mock-data'
import { renderPage } from '@/pages/page-router'

const description = 'Full application shell with sidebar, header, and page content.'

function AppShellPreview({ theme }: { theme: 'light' | 'dark' }) {
  const [activeNavId, setActiveNavId] = useState('overview')
  const pageMeta = getPageMeta(activeNavId)

  const shell = (
    <AppShell
      title={pageMeta.title}
      subtitle={pageMeta.subtitle}
      sidebarItems={[...navItems]}
      mobileNavItems={[...mobileNavItems]}
      activeNavId={activeNavId}
      onNavigate={setActiveNavId}
      onToggleTheme={fn()}
      theme={theme}
    >
      {renderPage(activeNavId)}
    </AppShell>
  )

  if (theme === 'dark') {
    return <DarkPreview>{shell}</DarkPreview>
  }

  return shell
}

const sections: DocSectionConfig[] = [
  {
    title: 'Light',
    description: 'Default dashboard shell with navigation and page content.',
    width: 'layout',
    code: `import { AppShell } from '@/components/layout/app-shell'

export function AppShellExample() {
  return (
    <AppShell title="Overview" subtitle="Your financial snapshot">
      {/* page content */}
    </AppShell>
  )
}`,
    render: () => (
      <PageFrame variant="desktop">
        <AppShellPreview theme="light" />
      </PageFrame>
    ),
  },
  {
    title: 'Dark',
    description: 'Same shell in dark theme.',
    width: 'layout',
    code: `// Apply dark theme via className="dark" on a wrapper or use theme toggle.`,
    render: () => (
      <PageFrame variant="desktop">
        <AppShellPreview theme="dark" />
      </PageFrame>
    ),
  },
]

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(AppShell, description, sections),
    },
  },
} satisfies Meta<typeof AppShell>

export default meta

export const Docs = createDocsOnlyStory(sections)
