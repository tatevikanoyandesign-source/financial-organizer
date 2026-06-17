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

import { TaxChecklistCard, type TaxChecklistItem } from './tax-checklist-card'

const description =
  'Tax tab filing readiness card with progress and a checklist of filing tasks.'

const baseItems: TaxChecklistItem[] = [
  {
    id: 'w2',
    label: 'W-2 forms received',
    status: 'Done',
    checked: true,
  },
  {
    id: '1099',
    label: '1099 forms collected',
    status: 'Done',
    checked: true,
  },
  {
    id: 'expenses',
    label: 'Business expenses categorized',
    status: 'In progress',
    checked: false,
  },
  {
    id: 'payments',
    label: 'Quarterly payments verified',
    status: 'Pending',
    checked: false,
  },
  {
    id: 'deductions',
    label: 'Deductions documented',
    status: 'Pending',
    checked: false,
  },
]

const sections: DocSectionConfig[] = [
  {
    title: 'In progress (50% complete)',
    description:
      'Half of filing tasks are complete with remaining items still pending.',
    width: 'mobile',
    code: `import { TaxChecklistCard } from '@/components/financial/tax-checklist-card'

export function InProgressExample() {
  return (
    <TaxChecklistCard
      heading="2024 Tax Filing"
      readinessPercent={50}
      items={[
        { id: 'w2', label: 'W-2 forms received', status: 'Done', checked: true },
        { id: '1099', label: '1099 forms collected', status: 'Done', checked: true },
        { id: 'expenses', label: 'Business expenses categorized', status: 'In progress', checked: false },
        { id: 'payments', label: 'Quarterly payments verified', status: 'Pending', checked: false },
      ]}
    />
  )
}`,
    render: () => (
      <TaxChecklistCard
        heading="2024 Tax Filing"
        readinessPercent={50}
        items={baseItems.slice(0, 4).map((item, index) =>
          index < 2 ? item : { ...item, checked: false },
        )}
      />
    ),
  },
  {
    title: 'Nearly done (90% complete)',
    description:
      'Most checklist items are done with one remaining task before filing.',
    width: 'mobile',
    code: `import { TaxChecklistCard } from '@/components/financial/tax-checklist-card'

export function NearlyDoneExample() {
  return (
    <TaxChecklistCard
      heading="2024 Tax Filing"
      readinessPercent={90}
      items={[
        { id: 'w2', label: 'W-2 forms received', status: 'Done', checked: true },
        { id: '1099', label: '1099 forms collected', status: 'Done', checked: true },
        { id: 'expenses', label: 'Business expenses categorized', status: 'Done', checked: true },
        { id: 'payments', label: 'Quarterly payments verified', status: 'Done', checked: true },
        { id: 'deductions', label: 'Deductions documented', status: 'Pending', checked: false },
      ]}
    />
  )
}`,
    render: () => (
      <TaxChecklistCard
        heading="2024 Tax Filing"
        readinessPercent={90}
        items={baseItems.map((item, index) =>
          index < 4
            ? { ...item, status: 'Done', checked: true }
            : { ...item, status: 'Pending', checked: false },
        )}
      />
    ),
  },
  {
    title: 'Complete',
    description: 'All filing tasks are checked off and readiness is at 100%.',
    width: 'mobile',
    code: `import { TaxChecklistCard } from '@/components/financial/tax-checklist-card'

export function CompleteExample() {
  return (
    <TaxChecklistCard
      heading="2024 Tax Filing"
      readinessPercent={100}
      items={[
        { id: 'w2', label: 'W-2 forms received', status: 'Complete', checked: true },
        { id: '1099', label: '1099 forms collected', status: 'Complete', checked: true },
        { id: 'expenses', label: 'Business expenses categorized', status: 'Complete', checked: true },
        { id: 'payments', label: 'Quarterly payments verified', status: 'Complete', checked: true },
        { id: 'deductions', label: 'Deductions documented', status: 'Complete', checked: true },
      ]}
    />
  )
}`,
    render: () => (
      <TaxChecklistCard
        heading="2024 Tax Filing"
        readinessPercent={100}
        items={baseItems.map((item) => ({
          ...item,
          status: 'Complete',
          checked: true,
        }))}
        onItemChange={fn()}
      />
    ),
  },
]

const meta = {
  title: 'Financial/TaxChecklistCard',
  component: TaxChecklistCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(TaxChecklistCard, description, sections),
    },
  },
} satisfies Meta<typeof TaxChecklistCard>

export default meta

export const Docs = createDocsOnlyStory(sections)
