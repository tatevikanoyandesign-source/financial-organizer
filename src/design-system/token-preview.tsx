import type { ReactNode } from 'react'

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

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="rounded-token-2xl border border-border bg-card p-token-6 shadow-sm">
      <div className="mb-token-5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-token-2 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

export function TokenPreview() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-token-8 px-token-6 py-token-12">
      <header className="space-y-token-3">
        <p className="text-sm font-medium text-text-secondary">
          Financial Organizer
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Design tokens
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Neutral gray foundation with semantic brand slots. Update the brand
          tokens in <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">src/styles/tokens/colors.css</code>{' '}
          when you are ready to introduce color.
        </p>
      </header>

      <Section
        title="Colors"
        description="Neutral gray scale plus semantic brand tokens."
      >
        <div className="space-y-token-6">
          <div>
            <p className="mb-token-3 text-sm font-medium text-foreground">
              Gray scale
            </p>
            <div className="grid grid-cols-2 gap-token-3 sm:grid-cols-4 lg:grid-cols-6">
              {grayScale.map((swatch) => (
                <div key={swatch.name} className="space-y-token-2">
                  <div
                    className={`h-16 rounded-token-xl border border-border ${swatch.className}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    gray-{swatch.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-token-3 text-sm font-medium text-foreground">
              Brand semantics
            </p>
            <div className="grid grid-cols-2 gap-token-3 md:grid-cols-3">
              {brandTokens.map((token) => (
                <div
                  key={token.name}
                  className={`flex h-20 items-end rounded-token-xl p-token-4 text-sm font-medium ${token.className}`}
                >
                  {token.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Typography"
        description="Display and body styles tuned for premium web UI."
      >
        <div className="space-y-token-4">
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
      </Section>

      <Section
        title="Spacing"
        description="4px-based spacing scale for layout rhythm."
      >
        <div className="flex flex-wrap items-end gap-token-4">
          {spacingTokens.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-token-2">
              <div className={`h-token-4 ${token.className} rounded-sm bg-gray-300`} />
              <span className="text-xs text-muted-foreground">
                token-{token.name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid gap-token-6 lg:grid-cols-2">
        <Section
          title="Radius"
          description="Soft corners for cards, inputs, and surfaces."
        >
          <div className="grid grid-cols-2 gap-token-4 sm:grid-cols-3">
            {radiusTokens.map((token) => (
              <div
                key={token.name}
                className={`flex h-20 items-center justify-center border border-border bg-surface-muted text-sm font-medium text-foreground ${token.className}`}
              >
                {token.name}
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Shadows"
          description="Layered elevation with subtle depth."
        >
          <div className="grid grid-cols-2 gap-token-4">
            {shadowTokens.map((token) => (
              <div
                key={token.name}
                className={`flex h-20 items-center justify-center rounded-token-xl bg-card text-sm font-medium text-foreground ${token.className}`}
              >
                {token.name}
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section
        title="Borders & motion"
        description="Hairline borders and restrained transitions."
      >
        <div className="grid gap-token-6 md:grid-cols-2">
          <div className="space-y-token-3">
            <div className="rounded-token-xl border border-border bg-card p-token-4">
              Default border
            </div>
            <div
              className="rounded-token-xl p-token-4"
              style={{ border: 'var(--border-width-strong) solid var(--border-color-strong)' }}
            >
              Strong border
            </div>
          </div>

          <button
            type="button"
            className="rounded-token-xl bg-brand-primary px-token-5 py-token-3 text-sm font-medium text-brand-primary-foreground transition-transform duration-normal ease-emphasized hover:scale-[1.02] active:scale-[0.98]"
          >
            Motion preview
          </button>
        </div>
      </Section>
    </div>
  )
}
