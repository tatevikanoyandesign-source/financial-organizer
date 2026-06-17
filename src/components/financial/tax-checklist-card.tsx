import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export type TaxChecklistItem = {
  id: string
  label: string
  status: string
  checked: boolean
}

type TaxChecklistCardProps = {
  heading: string
  readinessPercent: number
  readinessLabel?: string
  items: readonly TaxChecklistItem[]
  onItemChange?: (itemId: string, checked: boolean) => void
  className?: string
}

export function TaxChecklistCard({
  heading,
  readinessPercent,
  readinessLabel = 'Filing readiness',
  items,
  onItemChange,
  className,
}: TaxChecklistCardProps) {
  return (
    <Card
      className={cn(
        'rounded-lg border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardContent className="flex flex-col gap-6 pt-(--card-spacing)">
        <CardTitle>{heading}</CardTitle>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{readinessLabel}</p>
            <p className="text-sm font-medium text-foreground">
              {readinessPercent}%
            </p>
          </div>
          <Progress
            value={readinessPercent}
            className="h-1.5 bg-muted"
            aria-label={`${readinessLabel}: ${readinessPercent}%`}
          />
        </div>

        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <div className="flex items-center gap-4">
                <Checkbox
                  id={item.id}
                  checked={item.checked}
                  onCheckedChange={(checked) =>
                    onItemChange?.(item.id, checked === true)
                  }
                />
                <Label
                  htmlFor={item.id}
                  className="min-w-0 flex-1 font-normal text-foreground"
                >
                  {item.label}
                </Label>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
