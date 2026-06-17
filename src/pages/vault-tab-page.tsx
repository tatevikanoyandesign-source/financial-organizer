import { FileCheck, FileText, Home, Shield } from 'lucide-react'

import {
  VaultDocumentList,
  type VaultDocument,
  type VaultEntityFilter,
} from '@/components/financial/vault-document-list'
import { cn } from '@/lib/utils'

const vaultEntities: VaultEntityFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'venue', label: 'Event Venue' },
]

const vaultDocuments: VaultDocument[] = [
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

type VaultTabPageProps = {
  variant?: 'mobile' | 'desktop'
}

export function VaultTabPage({ variant = 'mobile' }: VaultTabPageProps) {
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
      <div className={cn(isMobile ? 'p-4' : 'mx-auto w-full max-w-5xl p-6')}>
        <VaultDocumentList entities={vaultEntities} documents={vaultDocuments} />
      </div>
    </div>
  )
}
