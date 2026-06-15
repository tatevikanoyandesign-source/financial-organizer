import { InsightCard } from '@/components/financial/insight-card'
import { insights } from '@/lib/mock-data'

export function InsightsPage() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-token-4">
      {insights.map((insight) => (
        <InsightCard key={insight.id} {...insight} />
      ))}
    </div>
  )
}
