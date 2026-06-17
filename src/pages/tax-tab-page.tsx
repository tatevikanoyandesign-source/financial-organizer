import { Card, CardContent } from '@/components/ui/card'
import {
  TaxChecklistCard,
  type TaxChecklistItem,
} from '@/components/financial/tax-checklist-card'
import { cn } from '@/lib/utils'

const taxChecklistItems: TaxChecklistItem[] = [
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
    status: 'Done',
    checked: true,
  },
  {
    id: 'payments',
    label: 'Quarterly payments verified',
    status: 'Done',
    checked: true,
  },
  {
    id: 'deductions',
    label: 'Deductions documented',
    status: 'Pending',
    checked: false,
  },
]

type TaxTabPageProps = {
  variant?: 'mobile' | 'desktop'
}

export function TaxTabPage({ variant = 'mobile' }: TaxTabPageProps) {
  const isMobile = variant === 'mobile'

  return (
    <div
      className={cn(
        'bg-background',
        isMobile &&
          'mx-auto w-full max-w-[390px] pt-[max(env(safe-area-inset-top,0px),1rem)] pb-[max(env(safe-area-inset-bottom,0px),1rem)]',
        !isMobile && 'w-full min-w-0',
      )}
    >
      <div
        className={cn(
          'flex flex-col',
          isMobile ? 'gap-4 p-4' : 'mx-auto w-full max-w-5xl gap-6 p-6',
        )}
      >
        <TaxChecklistCard
          heading="2024 Tax Filing"
          readinessPercent={90}
          items={taxChecklistItems}
        />

        <Card className="rounded-lg border border-dashed border-border/80 bg-muted/30 shadow-none ring-0">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Tax strategy section — coming soon
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
