import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import {
  ArrowDownLeft,
  Building2,
  CalendarClock,
  Coffee,
  FileCheck,
  Receipt,
  ShoppingBag,
  Smartphone,
} from 'lucide-react'

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
  ActivityFeed,
  type ActivityFeedGroup,
} from './activity-feed'

const description =
  'Home tab activity feed grouped by date with icons, schedule badges, and optional row actions.'

const personalFeed: ActivityFeedGroup[] = [
  {
    id: 'today',
    label: 'Today',
    items: [
      {
        id: 'groceries',
        icon: ShoppingBag,
        title: 'Whole Foods Market',
        description: 'Groceries · Chase Checking',
        date: '2:14 PM',
      },
      {
        id: 'deposit',
        icon: ArrowDownLeft,
        title: 'Direct deposit',
        description: 'Payroll · Ally Savings',
        date: '9:00 AM',
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    items: [
      {
        id: 'apple',
        icon: Smartphone,
        title: 'Apple Services',
        description: 'Subscription · Amex',
        date: 'Mar 12',
      },
      {
        id: 'coffee',
        icon: Coffee,
        title: 'Blue Bottle Coffee',
        description: 'Dining · Chase Checking',
        date: 'Mar 11',
      },
    ],
  },
]

const consultingFeed: ActivityFeedGroup[] = [
  {
    id: 'today',
    label: 'Today',
    items: [
      {
        id: 'invoice-paid',
        icon: FileCheck,
        title: 'Invoice paid: $12,500',
        badge: 'Sched C',
        description: 'Client: Northwind Studio',
        date: '11:30 AM',
        actionLabel: 'View',
      },
      {
        id: 'expense-logged',
        icon: Receipt,
        title: 'Expense logged: $284',
        badge: 'Sched C',
        description: 'Adobe Creative Cloud',
        date: '9:15 AM',
        actionLabel: 'Categorize',
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    items: [
      {
        id: 'estimate-due',
        icon: CalendarClock,
        title: 'Quarterly estimate due',
        badge: 'Sched C',
        description: 'Estimated tax payment · Apr 15',
        date: 'Mar 12',
        actionLabel: 'Review',
      },
      {
        id: 'wire-received',
        icon: Building2,
        title: 'Wire received: $8,200',
        badge: 'Sched C',
        description: 'Retainer · Business checking',
        date: 'Mar 12',
      },
    ],
  },
]

const sections: DocSectionConfig[] = [
  {
    title: 'Personal entity feed',
    description:
      'Everyday spending and deposits grouped under Today and Yesterday with no schedule badges.',
    width: 'mobile',
    code: `import { ActivityFeed } from '@/components/financial/activity-feed'
import { ArrowDownLeft, Coffee, ShoppingBag, Smartphone } from 'lucide-react'

const groups = [
  {
    id: 'today',
    label: 'Today',
    items: [
      {
        id: 'groceries',
        icon: ShoppingBag,
        title: 'Whole Foods Market',
        description: 'Groceries · Chase Checking',
        date: '2:14 PM',
      },
      {
        id: 'deposit',
        icon: ArrowDownLeft,
        title: 'Direct deposit',
        description: 'Payroll · Ally Savings',
        date: '9:00 AM',
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    items: [
      {
        id: 'apple',
        icon: Smartphone,
        title: 'Apple Services',
        description: 'Subscription · Amex',
        date: 'Mar 12',
      },
      {
        id: 'coffee',
        icon: Coffee,
        title: 'Blue Bottle Coffee',
        description: 'Dining · Chase Checking',
        date: 'Mar 11',
      },
    ],
  },
]

export function PersonalFeedExample() {
  return <ActivityFeed groups={groups} />
}`,
    render: () => <ActivityFeed groups={personalFeed} />,
  },
  {
    title: 'Consulting entity feed',
    description:
      'Business activity with Sched C badges and row actions such as View, Categorize, and Review.',
    width: 'mobile',
    code: `import { ActivityFeed } from '@/components/financial/activity-feed'
import { Building2, CalendarClock, FileCheck, Receipt } from 'lucide-react'

const groups = [
  {
    id: 'today',
    label: 'Today',
    items: [
      {
        id: 'invoice-paid',
        icon: FileCheck,
        title: 'Invoice paid: $12,500',
        badge: 'Sched C',
        description: 'Client: Northwind Studio',
        date: '11:30 AM',
        actionLabel: 'View',
      },
      {
        id: 'expense-logged',
        icon: Receipt,
        title: 'Expense logged: $284',
        badge: 'Sched C',
        description: 'Adobe Creative Cloud',
        date: '9:15 AM',
        actionLabel: 'Categorize',
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    items: [
      {
        id: 'estimate-due',
        icon: CalendarClock,
        title: 'Quarterly estimate due',
        badge: 'Sched C',
        description: 'Estimated tax payment · Apr 15',
        date: 'Mar 12',
        actionLabel: 'Review',
      },
      {
        id: 'wire-received',
        icon: Building2,
        title: 'Wire received: $8,200',
        badge: 'Sched C',
        description: 'Retainer · Business checking',
        date: 'Mar 12',
      },
    ],
  },
]

export function ConsultingFeedExample() {
  return (
    <ActivityFeed
      groups={groups}
      onActionClick={(item) => console.log(item.id)}
    />
  )
}`,
    render: () => (
      <ActivityFeed groups={consultingFeed} onActionClick={fn()} />
    ),
  },
]

const meta = {
  title: 'Financial/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: { component: description },
      page: createComponentDocPage(ActivityFeed, description, sections),
    },
  },
} satisfies Meta<typeof ActivityFeed>

export default meta

export const Docs = createDocsOnlyStory(sections)
