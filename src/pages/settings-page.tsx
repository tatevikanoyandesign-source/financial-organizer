import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import {
  SettingsRow,
  SettingsSection,
  SettingsToggle,
} from '@/components/settings/settings-section'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { connectedAccounts } from '@/lib/mock-data'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [weeklySummary, setWeeklySummary] = useState(true)
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [largePurchaseAlerts, setLargePurchaseAlerts] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-token-6">
      <SettingsSection
        title="Appearance"
        description="Choose how Financial Organizer looks on this device."
      >
        <SettingsRow
          label="Theme"
          description="Switch between light and dark mode."
          control={
            <div className="flex items-center gap-token-2 rounded-token-xl border border-border bg-surface-muted p-token-1">
              <Button
                type="button"
                size="sm"
                variant={theme === 'light' ? 'default' : 'ghost'}
                className="rounded-lg"
                onClick={() => setTheme('light')}
              >
                <Sun className="size-4" />
                Light
              </Button>
              <Button
                type="button"
                size="sm"
                variant={theme === 'dark' ? 'default' : 'ghost'}
                className="rounded-lg"
                onClick={() => setTheme('dark')}
              >
                <Moon className="size-4" />
                Dark
              </Button>
            </div>
          }
        />
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Control which updates you receive."
      >
        <SettingsRow
          label="Weekly summary"
          description="A recap of spending and savings every Sunday."
          control={
            <SettingsToggle
              checked={weeklySummary}
              onChange={setWeeklySummary}
              label="Weekly summary"
            />
          }
        />
        <SettingsRow
          label="Budget alerts"
          description="Notify me when a category nears its limit."
          control={
            <SettingsToggle
              checked={budgetAlerts}
              onChange={setBudgetAlerts}
              label="Budget alerts"
            />
          }
        />
        <SettingsRow
          label="Large purchase alerts"
          description="Flag transactions above $250."
          control={
            <SettingsToggle
              checked={largePurchaseAlerts}
              onChange={setLargePurchaseAlerts}
              label="Large purchase alerts"
            />
          }
        />
      </SettingsSection>

      <SettingsSection
        title="Connected accounts"
        description="Manage linked banks and cards."
      >
        {connectedAccounts.map((account) => (
          <SettingsRow
            key={account.id}
            label={account.name}
            description={`${account.status} · Synced ${account.lastSync}`}
            control={
              <Button variant="outline" size="sm">
                Manage
              </Button>
            }
          />
        ))}
      </SettingsSection>

      <SettingsSection
        title="Data & privacy"
        description="Export or remove your local demo data."
      >
        <SettingsRow
          label="Export data"
          description="Download a sample CSV of your transactions."
          control={
            <Button variant="outline" size="sm">
              Export
            </Button>
          }
        />
        <SettingsRow
          label="Reset demo"
          description="Restore sample accounts and budgets."
          control={
            <Button variant="outline" size="sm">
              Reset
            </Button>
          }
        />
      </SettingsSection>
    </div>
  )
}
