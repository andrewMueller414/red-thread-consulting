"use client";
import React, { useEffect, useEffectEvent, type ReactNode } from "react";
import { useMdxClientParse } from "../../admin/mdx_management/hooks/use_mdx_client_parse";
import { getComponentMap } from "../data/component_map";
import { LoadingComponent } from "../../../core/shared_components/loading_component";
import { cn } from "../../../lib/utils";
import "../data/mdx.scss";
import { useHeightWithoutNav } from "@/core/state/hooks/use_height_without_nav";

interface MdxContentProps {
    mdx: string;
    className?: string;
    inline?: boolean;
    expandLoading?: boolean;
}

export const MdxContent = ({
    mdx,
    inline,
    className,
    expandLoading,
}: MdxContentProps): ReactNode => {
    const [Component, setContent] = useMdxClientParse();

    const heightWithoutNav = useHeightWithoutNav();

    const _setContent = useEffectEvent((_mdx: string) => setContent(_mdx));

    useEffect(() => {
        _setContent(mdx);
    }, [mdx]);

    if (Component && inline) {
        return (
            /* @ts-expect-error -- Need to create component during render. */
            <Component components={getComponentMap()} />
        );
    }

    return Component ? (
        <div
            className={cn(
                "max-w-270 w-full mdx @container/mdx max-h-full prose prose-h2:mt-0 prose-h3:my-4 prose-blockquote:border-dust prose-li:marker:text-mist",
                className,
            )}
        >
            {/* @ts-expect-error -- Need to create component during render. */}
            <Component components={getComponentMap()} />
        </div>
    ) : (
        <div
            className={cn("w-full h-full flex flex-col justify-center items-center")}
            style={{
                ...(expandLoading && {
                    minHeight: `${heightWithoutNav}px`,
                }),
            }}
        >
            <LoadingComponent />
        </div>
    );
};

MdxContent.displayName = "MdxContent";
