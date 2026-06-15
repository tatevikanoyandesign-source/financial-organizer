import { Building2 } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

type AccountCardProps = {
  name: string
  institution: string
  balance: number
  mask: string
  type: string
  className?: string
}

export function AccountCard({
  name,
  institution,
  balance,
  mask,
  type,
  className,
}: AccountCardProps) {
  const isNegative = balance < 0

  return (
    <Card
      className={cn(
        'rounded-token-2xl border-border/80 bg-card shadow-sm ring-0 transition-transform duration-normal ease-emphasized hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-token-3">
          <div className="flex items-center gap-token-3">
            <div className="flex size-11 items-center justify-center rounded-token-xl bg-surface-muted text-foreground">
              <Building2 className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {institution} · {type}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-token-5">
        <p
          className={cn(
            'text-2xl font-semibold tracking-tight',
            isNegative ? 'text-brand-danger' : 'text-foreground',
          )}
        >
          {formatCurrency(balance)}
        </p>
        <p className="mt-token-2 text-sm text-muted-foreground">•••• {mask}</p>
      </CardContent>
    </Card>
  )
}
