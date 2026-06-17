const grayScale = [
  { name: '50', className: 'bg-gray-50' },
  { name: '100', className: 'bg-gray-100' },
  { name: '200', className: 'bg-gray-200' },
  { name: '300', className: 'bg-gray-300' },
  { name: '400', className: 'bg-gray-400' },
  { name: '500', className: 'bg-gray-500' },
  { name: '600', className: 'bg-gray-600' },
  { name: '700', className: 'bg-gray-700' },
  { name: '800', className: 'bg-gray-800' },
  { name: '900', className: 'bg-gray-900' },
  { name: '950', className: 'bg-gray-950' },
] as const

const brandTokens = [
  { name: 'Primary', className: 'bg-brand-primary text-brand-primary-foreground' },
  { name: 'Accent', className: 'bg-brand-accent text-brand-accent-foreground' },
  { name: 'Success', className: 'bg-brand-success text-brand-success-foreground' },
  { name: 'Warning', className: 'bg-brand-warning text-brand-warning-foreground' },
  { name: 'Danger', className: 'bg-brand-danger text-brand-danger-foreground' },
  { name: 'Info', className: 'bg-brand-info text-brand-info-foreground' },
] as const

const spacingTokens = [
  { name: '1', className: 'w-token-1' },
  { name: '2', className: 'w-token-2' },
  { name: '3', className: 'w-token-3' },
  { name: '4', className: 'w-token-4' },
  { name: '6', className: 'w-token-6' },
  { name: '8', className: 'w-token-8' },
  { name: '12', className: 'w-token-12' },
] as const

const radiusTokens = [
  { name: 'SM', className: 'rounded-sm' },
  { name: 'MD', className: 'rounded-md' },
  { name: 'LG', className: 'rounded-lg' },
  { name: 'XL', className: 'rounded-token-xl' },
  { name: '2XL', className: 'rounded-token-2xl' },
  { name: 'Full', className: 'rounded-token-full' },
] as const

const shadowTokens = [
  { name: 'XS', className: 'shadow-xs' },
  { name: 'SM', className: 'shadow-sm' },
  { name: 'MD', className: 'shadow-md' },
  { name: 'LG', className: 'shadow-lg' },
  { name: 'XL', className: 'shadow-xl' },
] as const

export function ColorsTokenPreview() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-8">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Gray scale</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {grayScale.map((swatch) => (
            <div key={swatch.name} className="space-y-2">
              <div
                className={`h-16 rounded-token-xl border border-border ${swatch.className}`}
              />
              <p className="text-xs text-muted-foreground">gray-{swatch.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Semantic slots</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {brandTokens.map((token) => (
            <div
              key={token.name}
              className={`flex h-20 items-end rounded-token-xl p-4 text-sm font-medium ${token.className}`}
            >
              {token.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TypographyTokenPreview() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-6 py-8">
      <p className="text-5xl font-semibold tracking-tight">Display 5XL</p>
      <p className="text-4xl font-semibold tracking-tight">Heading 4XL</p>
      <p className="text-2xl font-semibold tracking-tight">Heading 2XL</p>
      <p className="text-base text-foreground">
        Body base — calm rhythm for financial content and summaries.
      </p>
      <p className="text-sm text-muted-foreground">
        Body small — secondary labels, metadata, and helper text.
      </p>
    </div>
  )
}

export function SpacingTokenPreview() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end gap-4 px-6 py-8">
      {spacingTokens.map((token) => (
        <div key={token.name} className="flex flex-col items-center gap-2">
          <div className={`h-token-4 ${token.className} rounded-sm bg-gray-300`} />
          <span className="text-xs text-muted-foreground">token-{token.name}</span>
        </div>
      ))}
    </div>
  )
}

export function RadiusTokenPreview() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-6 py-8 sm:grid-cols-3">
      {radiusTokens.map((token) => (
        <div
          key={token.name}
          className={`flex h-20 items-center justify-center border border-border bg-surface-muted text-sm font-medium text-foreground ${token.className}`}
        >
          {token.name}
        </div>
      ))}
    </div>
  )
}

export function ShadowsTokenPreview() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-6 py-8 md:grid-cols-3">
      {shadowTokens.map((token) => (
        <div
          key={token.name}
          className={`flex h-20 items-center justify-center rounded-token-xl bg-card text-sm font-medium text-foreground ${token.className}`}
        >
          {token.name}
        </div>
      ))}
    </div>
  )
}
