import type { Meta } from '@storybook/react-vite'
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

import { MobileNav } from './mobile-nav'
import { mobileNavItems } from '@/lib/mock-data'

const description = 'Bottom tab navigation for phone-sized viewports.'

const sections: DocSectionConfig[] = [
  {
    title: 'Default',
    description: 'Fixed bottom navigation with four primary tabs.',
    width: 'mobile',
    code: `import { MobileNav } from '@/components/layout/mobile-nav'

export function MobileNavExample() {
  return (
    <MobileNav
      items={mobileNavItems}
      activeId="overview"
      onNavigate={(id) => console.log(id)}
    />
  )
}`,
    render: function Render() {
      const [activeId, setActiveId] = useState('overview')

      return (
        <PageFrame variant="mobile">
          <div className="min-h-[520px] pb-24">
            <p className="mb-4 text-sm text-muted-foreground">
              Bottom navigation preview for phone-sized viewports.
            </p>
            <MobileNav
              items={[...mobileNavItems]}
              activeId={activeId}
              onNavigate={setActiveId}
            />
          </div>
        </PageFrame>
      )
    },
  },
]

const meta = {
  title: 'Layout/MobileNav',
  component: MobileNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(MobileNav, description, sections),
    },
  },
} satisfies Meta<typeof MobileNav>

export default meta

export const Docs = createDocsOnlyStory(sections)
