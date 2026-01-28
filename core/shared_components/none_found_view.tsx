import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import React, { FC, type ReactNode } from "react";

interface NoneFoundViewProps {
    Icon?: FC<{ className?: string }>;
    body?: string;
    label?: string;
    classes?: {
        iconContainer?: string;
        icon?: string;
    };
}

export const NoneFoundView = ({
    Icon = IconSearch,
    body = "Nothing was found.",
    label = "Oh no",
    classes = {},
}: NoneFoundViewProps): ReactNode => {
    return (
        <div className="h-fit flex flex-col justify-center items-center w-[min(540px,90vw)]">
            <div
                className={cn(
                    "rounded-full bg-matcha text-pine p-4",
                    classes.iconContainer,
                )}
            >
                <Icon className={cn("", classes.icon)} />
            </div>
            <div className="text-xl font-bellefair my-4 mb-2">{label}</div>
            <div className="font-mono text-sm text-center">{body}</div>
        </div>
    );
};

NoneFoundView.displayName = "NoneFoundView";
