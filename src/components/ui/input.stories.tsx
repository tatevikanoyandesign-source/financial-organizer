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

import { Input } from './input'

const fieldLabelClass = 'text-sm font-medium leading-none'

const description = 'Use inputs for text entry in forms and filters.'

const sections: DocSectionConfig[] = [
  {
    title: 'Default',
    description: 'Label, placeholder, and helper text.',
    width: 'form',
    code: `import { Input } from '@/components/ui/input'

export function DefaultExample() {
  return (
    <div className="space-y-2">
      <label htmlFor="amount" className="text-sm font-medium">Amount</label>
      <Input id="amount" placeholder="Enter amount" />
      <p className="text-sm text-muted-foreground">Enter a positive number.</p>
    </div>
  )
}`,
    render: () => (
      <div className="space-y-2">
        <label htmlFor="amount" className={fieldLabelClass}>
          Amount
        </label>
        <Input id="amount" placeholder="Enter amount" />
        <p className="text-sm text-muted-foreground">Enter a positive number.</p>
      </div>
    ),
  },
  {
    title: 'Filled value',
    description: 'Input with a pre-filled value.',
    width: 'form',
    code: `import { Input } from '@/components/ui/input'

export function FilledExample() {
  return (
    <div className="space-y-2">
      <label htmlFor="balance" className="text-sm font-medium">Balance</label>
      <Input id="balance" defaultValue="1,248.00" />
    </div>
  )
}`,
    render: () => (
      <div className="space-y-2">
        <label htmlFor="balance" className={fieldLabelClass}>
          Balance
        </label>
        <Input id="balance" defaultValue="1,248.00" />
      </div>
    ),
  },
  {
    title: 'Disabled',
    description: 'Inactive field for read-only contexts.',
    width: 'form',
    code: `import { Input } from '@/components/ui/input'

export function DisabledExample() {
  return (
    <div className="space-y-2">
      <label htmlFor="disabled" className="text-sm font-medium">Account number</label>
      <Input id="disabled" placeholder="Disabled input" disabled />
    </div>
  )
}`,
    render: () => (
      <div className="space-y-2">
        <label htmlFor="disabled" className={fieldLabelClass}>
          Account number
        </label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>
    ),
  },
  {
    title: 'Error',
    description: 'Invalid state with helper text.',
    width: 'form',
    code: `import { Input } from '@/components/ui/input'

export function ErrorExample() {
  return (
    <div className="space-y-2">
      <label htmlFor="error" className="text-sm font-medium">Transfer amount</label>
      <Input id="error" placeholder="Required field" aria-invalid />
      <p className="text-sm text-muted-foreground">Amount exceeds available balance.</p>
    </div>
  )
}`,
    render: () => (
      <div className="space-y-2">
        <label htmlFor="error" className={fieldLabelClass}>
          Transfer amount
        </label>
        <Input id="error" placeholder="Required field" aria-invalid />
        <p className="text-sm text-muted-foreground">Amount exceeds available balance.</p>
      </div>
    ),
  },
]

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(Input, description, sections),
    },
  },
} satisfies Meta<typeof Input>

export default meta

export const Docs = createDocsOnlyStory(sections)
