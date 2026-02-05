import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-matcha/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                // Placeholder colors.
                "group-[.bg-mist]:placeholder:text-fog/70 group-[.bg-pine]:placeholder:text-fog/60 group-[.bg-moss]:placeholder:text-fog/60 group-[.bg-dust]:placeholder:text-fog/60 placeholder:text-dust/60 ",
                // Ring colors.
                "border-dust/50 group-[.bg-pine]:border-mist/50 group-[.bg-pine]:focus-visible:border-mist/70 group-[.bg-moss]:border-mist/50 group-[.bg-moss]:focus-visible:border-mist/70 group-[.bg-dust]:border-mist/50 group-[.bg-dust]:focus-visible:border-mist/70 focus-visible:border-dust/70 group-[.bg-dust]:focus-visible:ring-fog/50 group-[.bg-moss]:focus-visible:ring-fog/50 group-[.bg-pine]:focus-visible:ring-fog/50 group-[.bg-matcha]:focus-visible:ring-pine/50 group-[.bg-cream]:focus-visible:ring-pine/50 group-[.bg-fog]:focus-visible:ring-pine/50 group-[.bg-mist]:focus-visible:ring-fog/50",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
