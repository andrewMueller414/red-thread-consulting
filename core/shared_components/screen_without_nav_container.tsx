"use client";
import React, { HTMLProps, type ReactNode } from "react";
import { useHeightWithoutNav } from "../state/hooks/use_height_without_nav";

interface ScreenWithoutNavContainerProps extends HTMLProps<HTMLDivElement> {
    expanded?: boolean;
}

export const ScreenWithoutNavContainer = ({
    expanded = true,
    ...props
}: ScreenWithoutNavContainerProps): ReactNode => {
    const height = useHeightWithoutNav();
    return (
        <div
            {...props}
            style={{
                minHeight: expanded ? `${height}px` : undefined,
                ...props.style,
            }}
        />
    );
};

ScreenWithoutNavContainer.displayName = "ScreenWithoutNavContainer";
