import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { FileCheck, FileText, Home, Shield } from 'lucide-react'

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

import {
  VaultDocumentList,
  type VaultDocument,
  type VaultEntityFilter,
} from './vault-document-list'

const description =
  'Vault tab document list with entity filter tabs and downloadable document rows.'

const entities: VaultEntityFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'venue', label: 'Event Venue' },
]

const documents: VaultDocument[] = [
  {
    id: 'w2',
    name: 'W-2 2024',
    date: 'Mar 1, 2025',
    entityId: 'personal',
    entityLabel: 'Personal',
    icon: FileText,
    actionLabel: 'View',
  },
  {
    id: 'mortgage',
    name: 'Mortgage statement',
    date: 'Mar 5, 2025',
    entityId: 'personal',
    entityLabel: 'Personal',
    icon: Home,
    actionLabel: 'View',
  },
  {
    id: 'invoice',
    name: 'Q4 Invoice — Northwind Studio',
    date: 'Feb 18, 2025',
    entityId: 'consulting',
    entityLabel: 'Consulting',
    icon: FileCheck,
    actionLabel: 'Download',
  },
  {
    id: '1099',
    name: '1099-NEC',
    date: 'Feb 10, 2025',
    entityId: 'consulting',
    entityLabel: 'Consulting',
    icon: FileText,
    actionLabel: 'Download',
  },
  {
    id: 'insurance',
    name: 'Venue insurance policy',
    date: 'Jan 5, 2025',
    entityId: 'venue',
    entityLabel: 'Event Venue',
    icon: Shield,
    actionLabel: 'View',
  },
]

const sections: DocSectionConfig[] = [
  {
    title: 'Default',
    description:
      'Entity filter tabs above a list of document cards with badges and view/download actions.',
    width: 'mobile',
    code: `import { VaultDocumentList } from '@/components/financial/vault-document-list'
import { FileCheck, FileText, Home, Shield } from 'lucide-react'

const entities = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'venue', label: 'Event Venue' },
]

const documents = [
  {
    id: 'w2',
    name: 'W-2 2024',
    date: 'Mar 1, 2025',
    entityId: 'personal',
    entityLabel: 'Personal',
    icon: FileText,
    actionLabel: 'View',
  },
  {
    id: 'invoice',
    name: 'Q4 Invoice — Northwind Studio',
    date: 'Feb 18, 2025',
    entityId: 'consulting',
    entityLabel: 'Consulting',
    icon: FileCheck,
    actionLabel: 'Download',
  },
]

export function DefaultExample() {
  return (
    <VaultDocumentList
      entities={entities}
      documents={documents}
      onEntityChange={(entityId) => console.log(entityId)}
      onDocumentAction={(document) => console.log(document.id)}
    />
  )
}`,
    render: () => (
      <VaultDocumentList
        entities={entities}
        documents={documents}
        onEntityChange={fn()}
        onDocumentAction={fn()}
      />
    ),
  },
]

const meta = {
  title: 'Financial/VaultDocumentList',
  component: VaultDocumentList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(VaultDocumentList, description, sections),
    },
  },
} satisfies Meta<typeof VaultDocumentList>

export default meta

export const Docs = createDocsOnlyStory(sections)
