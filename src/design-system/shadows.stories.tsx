import type { Meta } from '@storybook/react-vite'

import type { ReactNode } from 'react'

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

function createDocsOnlyStory(sections: DocSectionConfig[]) {
  return {
    render: () => renderDocOverview(sections),
  }
}

import { ShadowsTokenPreview } from './token-sections'

const description = 'Layered elevation shadows for cards and floating surfaces.'

const meta = {
  title: 'Tokens/Shadows',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
    },
  },
} satisfies Meta

export default meta

export const Docs = createDocsOnlyStory([
  {
    title: 'Shadows',
    description,
    code: '',
    width: 'full',
    render: () => <ShadowsTokenPreview />,
  },
])
