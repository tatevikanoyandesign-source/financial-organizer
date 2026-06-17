import type { Meta } from '@storybook/react-vite'

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

function buildPageSections(
  PageComponent: ComponentType,
  variant: 'mobile' | 'desktop',
  importPath: string,
): DocSectionConfig[] {
  const previewWidth = variant === 'mobile' ? ('mobile' as const) : ('full' as const)

  return [
    {
      title: 'Light',
      description: 'Default light theme.',
      width: previewWidth,
      code: `import { Page } from '${importPath}'

export function LightExample() {
  return <Page />
}`,
      render: () => (
        <PageFrame variant={variant}>
          <PageComponent />
        </PageFrame>
      ),
    },
    {
      title: 'Dark',
      description: 'Dark theme variant.',
      width: previewWidth,
      code: `// Wrap in className="dark" for dark theme preview.`,
      render: () => (
        <DarkPreview>
          <PageFrame variant={variant}>
            <PageComponent />
          </PageFrame>
        </DarkPreview>
      ),
    },
  ]
}

function buildPageDocs<C extends ComponentType>(
  PageComponent: C,
  _description: string,
  sections: DocSectionConfig[],
) {
  return {
    layout: 'fullscreen' as const,
    docs: {
      description: { component: description },
      page: createComponentDocPage(PageComponent, description, sections),
    },
  }
}

import { TransactionsPage } from './transactions-page'

const description = 'Full transaction history with filters and grouping.'
const sections = buildPageSections(TransactionsPage, 'desktop', '@/pages/transactions-page')

const meta = {
  title: 'Pages/Desktop/Transactions',
  component: TransactionsPage,
  parameters: buildPageDocs(TransactionsPage, description, sections),
} satisfies Meta<typeof TransactionsPage>

export default meta

export const Docs = createDocsOnlyStory(sections)
