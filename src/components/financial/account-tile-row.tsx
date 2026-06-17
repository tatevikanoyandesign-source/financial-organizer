import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export type AccountTile = {
  id: string
  institution: string
  accountType: string
  mask: string
  balance: number
}

type AccountTileRowProps = {
  accounts: readonly AccountTile[]
  onTileClick?: (account: AccountTile) => void
  className?: string
}

function AccountTileCard({
  account,
  onClick,
}: {
  account: AccountTile
  onClick?: () => void
}) {
  const isNegative = account.balance < 0

  return (
    <Card
      className={cn(
        'w-40 shrink-0 snap-start rounded-lg border-border/80 bg-card shadow-sm ring-0',
        onClick && 'cursor-pointer transition-shadow hover:shadow-md',
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <CardContent className="flex h-full flex-col gap-2 pt-(--card-spacing)">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {account.institution}
        </p>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-snug text-foreground">
            {account.accountType}
          </p>
          <p className="text-sm text-muted-foreground">•••• {account.mask}</p>
        </div>
        <p
          className={cn(
            'mt-auto pt-2 text-3xl font-bold tracking-tight',
            isNegative ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {formatCurrency(account.balance)}
        </p>
      </CardContent>
    </Card>
  )
}

export function AccountTileRow({
  accounts,
  onTileClick,
  className,
}: AccountTileRowProps) {
  return (
    <div
      className={cn(
        'flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {accounts.map((account) => (
        <AccountTileCard
          key={account.id}
          account={account}
          onClick={onTileClick ? () => onTileClick(account) : undefined}
        />
      ))}
    </div>
  )
}
