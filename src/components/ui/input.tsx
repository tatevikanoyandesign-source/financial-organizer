import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-[var(--touch-target-min)] h-[var(--touch-target-min)] w-full min-w-0 rounded-md border border-input bg-transparent px-[var(--space-md)] text-[length:var(--type-body-size)] font-[number:var(--type-body-weight)] tracking-[var(--type-body-tracking)] transition-colors outline-none file:inline-flex file:h-[var(--touch-target-min)] file:border-0 file:bg-transparent file:text-[length:var(--type-body-size)] file:font-[number:var(--type-body-weight)] file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
