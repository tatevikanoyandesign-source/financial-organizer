import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type EntityOption = {
  id: string
  label: string
}

type EntitySwitcherProps = {
  entities: readonly EntityOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (entityId: string) => void
  className?: string
}

export function EntitySwitcher({
  entities,
  value,
  defaultValue,
  onValueChange,
  className,
}: EntitySwitcherProps) {
  return (
    <Tabs
      value={value}
      defaultValue={defaultValue ?? entities[0]?.id}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0">
        {entities.map((entity) => (
          <TabsTrigger
            key={entity.id}
            value={entity.id}
            className={cn(
              'min-h-[var(--touch-target-min)] shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium',
              'bg-muted/60 text-muted-foreground shadow-none',
              'data-active:border-foreground data-active:bg-foreground data-active:text-background',
            )}
          >
            <span
              className="mr-2 inline-block size-2 shrink-0 rounded-full bg-muted-foreground"
              aria-hidden
            />
            {entity.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export const DEFAULT_ENTITIES: EntityOption[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'venue', label: 'Event Venue' },
]
