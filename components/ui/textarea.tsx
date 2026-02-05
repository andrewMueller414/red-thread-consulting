import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                // Placeholder colors
                "group-[.bg-mist]:placeholder:text-fog/70 group-[.bg-pine]:placeholder:text-fog/60 group-[.bg-moss]:placeholder:text-fog/60 group-[.bg-dust]:placeholder:text-fog/60 placeholder:text-dust/60 ",
                // Ring colors.
                "border-dust/50 group-[.bg-pine]:border-mist/50 group-[.bg-pine]:focus-visible:border-mist/70 group-[.bg-moss]:border-mist/50 group-[.bg-moss]:focus-visible:border-mist/70 group-[.bg-dust]:border-mist/50 group-[.bg-dust]:focus-visible:border-mist/70 focus-visible:border-dust/70 group-[.bg-dust]:focus-visible:ring-fog/50 group-[.bg-moss]:focus-visible:ring-fog/50 group-[.bg-pine]:focus-visible:ring-fog/50 group-[.bg-matcha]:focus-visible:ring-pine/50 group-[.bg-cream]:focus-visible:ring-pine/50 group-[.bg-fog]:focus-visible:ring-pine/50 group-[.bg-mist]:focus-visible:ring-fog/50",
                className,
            )}
            {...props}
        />
    );
}

export { Textarea };
