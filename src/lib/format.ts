export function formatCurrency(
  amount: number,
  options?: { currency?: string; locale?: string },
) {
  return new Intl.NumberFormat(options?.locale ?? 'en-US', {
    style: 'currency',
    currency: options?.currency ?? 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(value: number, options?: { signed?: boolean }) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
    signDisplay: options?.signed ? 'exceptZero' : 'auto',
  }).format(value / 100)

  return formatted
}
