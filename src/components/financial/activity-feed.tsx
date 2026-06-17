import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type ActivityFeedItem = {
  id: string
  icon: LucideIcon
  title: string
  badge?: string
  description: string
  date: string
  actionLabel?: string
}

export type ActivityFeedGroup = {
  id: string
  label: string
  items: readonly ActivityFeedItem[]
}

type ActivityFeedProps = {
  groups: readonly ActivityFeedGroup[]
  onActionClick?: (item: ActivityFeedItem) => void
  className?: string
}

function ActivityFeedRow({
  item,
  onActionClick,
}: {
  item: ActivityFeedItem
  onActionClick?: (item: ActivityFeedItem) => void
}) {
  const Icon = item.icon

  return (
    <li className="flex gap-4 px-4 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
        <Icon className="size-4" aria-hidden />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium leading-snug text-foreground">{item.title}</p>
          {item.badge ? (
            <Badge variant="outline" className="rounded-full">
              {item.badge}
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex items-center justify-between gap-4 pt-1">
          <p className="text-sm text-muted-foreground">{item.date}</p>
          {item.actionLabel ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto min-h-0 shrink-0 px-3 py-1.5 text-sm font-normal"
              onClick={() => onActionClick?.(item)}
            >
              {item.actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function ActivityFeed({
  groups,
  onActionClick,
  className,
}: ActivityFeedProps) {
  return (
    <Card
      className={cn(
        'rounded-lg border-border/80 bg-card shadow-sm ring-0',
        className,
      )}
    >
      <CardContent className="px-0 pb-0 pt-0">
        {groups.map((group, groupIndex) => (
          <section key={group.id}>
            {groupIndex > 0 ? <Separator /> : null}
            <h3 className="px-4 pb-2 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {group.label}
            </h3>
            <ul>
              {group.items.map((item) => (
                <ActivityFeedRow
                  key={item.id}
                  item={item}
                  onActionClick={onActionClick}
                />
              ))}
            </ul>
          </section>
        ))}
      </CardContent>
    </Card>
  )
}
