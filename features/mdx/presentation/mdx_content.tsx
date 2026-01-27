"use client";
import React, { useEffect, useEffectEvent, type ReactNode } from "react";
import { useMdxClientParse } from "../../admin/mdx_management/hooks/use_mdx_client_parse";
import { getComponentMap } from "../data/component_map";
import { LoadingComponent } from "../../../core/shared_components/loading_component";
import { cn } from "../../../lib/utils";

interface MdxContentProps {
    mdx: string;
    className?: string;
}

export const MdxContent = ({ mdx, className }: MdxContentProps): ReactNode => {
    const [Component, setContent] = useMdxClientParse();

    const _setContent = useEffectEvent((_mdx: string) => setContent(_mdx));

    useEffect(() => {
        _setContent(mdx);
    }, [mdx]);

    if (Component) {
        return (
            <div className={cn("max-w-270 @container/mdx prose", className)}>
                {/* @ts-expect-error -- Need to create component during render. */}
                <Component components={getComponentMap()} />
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <LoadingComponent />
        </div>
    );
};

MdxContent.displayName = "MdxContent";
