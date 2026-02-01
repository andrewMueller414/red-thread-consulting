"use client";
import React, { useEffect, useEffectEvent, type ReactNode } from "react";
import { useMdxClientParse } from "../../admin/mdx_management/hooks/use_mdx_client_parse";
import { getComponentMap } from "../data/component_map";
import { LoadingComponent } from "../../../core/shared_components/loading_component";
import { cn } from "../../../lib/utils";
import { MdxFormContainer } from "./mdx_form_container";
import "../data/mdx.scss";

interface MdxContentProps {
    mdx: string;
    className?: string;
    inline?: boolean;
}

export const MdxContent = ({
    mdx,
    inline,
    className,
}: MdxContentProps): ReactNode => {
    const [Component, setContent] = useMdxClientParse();

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

    return (
        <MdxFormContainer>
            {Component ? (
                <div
                    className={cn(
                        "max-w-270 mdx @container/mdx prose max-h-full",
                        className,
                    )}
                >
                    {/* @ts-expect-error -- Need to create component during render. */}
                    <Component components={getComponentMap()} />
                </div>
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <LoadingComponent />
                </div>
            )}
        </MdxFormContainer>
    );
};

MdxContent.displayName = "MdxContent";
