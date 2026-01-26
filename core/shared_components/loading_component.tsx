import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";
import { FadeLoader } from "react-spinners";

export const LoadingComponent = ({
    color = "var(--pine)",
    className,
}: {
    color?: string;
    className?: string;
}): ReactNode => {
    return <FadeLoader color={color} className={cn("p-8", className)} />;
};

LoadingComponent.displayName = "LoadingComponent";
