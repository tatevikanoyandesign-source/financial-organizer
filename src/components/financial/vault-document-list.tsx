import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type VaultEntityFilter = {
  id: string
  label: string
}

export type VaultDocument = {
  id: string
  name: string
  date: string
  entityId: string
  entityLabel: string
  icon: LucideIcon
  actionLabel: string
}

type VaultDocumentListProps = {
  entities: readonly VaultEntityFilter[]
  documents: readonly VaultDocument[]
  selectedEntityId?: string
  defaultEntityId?: string
  onEntityChange?: (entityId: string) => void
  onDocumentAction?: (document: VaultDocument) => void
  className?: string
}

function VaultDocumentRow({
  document,
  onAction,
}: {
  document: VaultDocument
  onAction?: (document: VaultDocument) => void
}) {
  const Icon = document.icon

  return (
    <Card className="rounded-lg border-border/80 bg-card shadow-sm ring-0">
      <CardContent className="flex items-center gap-4 pt-(--card-spacing)">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="size-4" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium text-foreground">{document.name}</p>
            <Badge variant="outline" className="rounded-full">
              {document.entityLabel}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{document.date}</p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto min-h-0 shrink-0 px-3 py-1.5 text-sm font-normal"
          onClick={() => onAction?.(document)}
        >
          {document.actionLabel}
        </Button>
      </CardContent>
    </Card>
  )
}

export function VaultDocumentList({
  entities,
  documents,
  selectedEntityId,
  defaultEntityId = 'all',
  onEntityChange,
  onDocumentAction,
  className,
}: VaultDocumentListProps) {
  const [internalEntityId, setInternalEntityId] = useState(defaultEntityId)
  const activeEntityId = selectedEntityId ?? internalEntityId

  const filteredDocuments = useMemo(() => {
    if (activeEntityId === 'all') {
      return documents
    }

    return documents.filter((document) => document.entityId === activeEntityId)
  }, [activeEntityId, documents])

  function handleEntityChange(entityId: string) {
    if (selectedEntityId === undefined) {
      setInternalEntityId(entityId)
    }
    onEntityChange?.(entityId)
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Tabs value={activeEntityId} onValueChange={handleEntityChange}>
        <TabsList className="h-auto w-full justify-start overflow-x-auto">
          {entities.map((entity) => (
            <TabsTrigger key={entity.id} value={entity.id} className="px-4">
              {entity.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ul className="flex flex-col gap-4">
        {filteredDocuments.map((document) => (
          <li key={document.id}>
            <VaultDocumentRow
              document={document}
              onAction={onDocumentAction}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
