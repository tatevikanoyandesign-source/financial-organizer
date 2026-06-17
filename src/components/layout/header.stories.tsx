import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

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

function DarkPreview({ children }: { children: ReactNode }) {
  return <div className="dark rounded-lg bg-background text-foreground">{children}</div>
}

import { Header } from './header'
import { headerMeta } from '@/lib/mock-data'

const description = 'Top bar with page title, search, and theme toggle.'

const sections: DocSectionConfig[] = [
  {
    title: 'Default',
    description: 'Standard header with search enabled.',
    width: 'layout',
    code: `import { Header } from '@/components/layout/header'

export function DefaultExample() {
  return (
    <Header
      title="Overview"
      subtitle="Your financial snapshot for March"
      theme="light"
      onToggleTheme={() => {}}
    />
  )
}`,
    render: () => (
      <Header
        title={headerMeta.title}
        subtitle={headerMeta.subtitle}
        theme="light"
        onToggleTheme={fn()}
      />
    ),
  },
  {
    title: 'Without search',
    description: 'Settings and detail pages hide the search field.',
    width: 'layout',
    code: `import { Header } from '@/components/layout/header'

export function WithoutSearchExample() {
  return (
    <Header
      title="Settings"
      subtitle="Manage preferences and connected accounts"
      showSearch={false}
      onToggleTheme={() => {}}
    />
  )
}`,
    render: () => (
      <Header
        title="Settings"
        subtitle="Manage preferences and connected accounts"
        showSearch={false}
        onToggleTheme={fn()}
      />
    ),
  },
  {
    title: 'Dark',
    description: 'Header in dark theme.',
    width: 'layout',
    code: `// Wrap in className="dark" for dark theme preview.`,
    render: () => (
      <DarkPreview>
        <Header
          title={headerMeta.title}
          subtitle={headerMeta.subtitle}
          theme="dark"
          onToggleTheme={fn()}
        />
      </DarkPreview>
    ),
  },
]

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(Header, description, sections),
    },
  },
} satisfies Meta<typeof Header>

export default meta

export const Docs = createDocsOnlyStory(sections)
