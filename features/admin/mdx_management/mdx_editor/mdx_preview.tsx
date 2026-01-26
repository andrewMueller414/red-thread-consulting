"use client";
import React, { useEffect, useEffectEvent, type ReactNode } from "react";
import { MdxFormContainer } from "@/features/mdx/presentation/mdx_form_container";
import { useMdxClientParse } from "../hooks/use_mdx_client_parse";
import { LoadingComponent } from "@/core/shared_components/loading_component";
import { getComponentMap } from "@/features/mdx/data/component_map";

export interface MdxEditorChangeEventProps {
    value: string;
}

declare global {
    interface WindowEventMap {
        "mdx-editor-change": CustomEvent<MdxEditorChangeEventProps>;
    }
}

export const MdxPreview = (): ReactNode => {
    const [Component, setMdx] = useMdxClientParse();

    const handleMdx = useEffectEvent((newContent: string) => setMdx(newContent));
    useEffect(() => {
        const handleEditorChange = (
            e: CustomEvent<MdxEditorChangeEventProps>,
        ): void => {
            handleMdx(e.detail.value);
        };
        window.addEventListener("mdx-editor-change", handleEditorChange);
        return () =>
            window.removeEventListener("mdx-editor-change", handleEditorChange);
    }, []);

    useEffect(() => {
        if (!Component) {
            window.dispatchEvent(new CustomEvent("request-editor-content"));
        }
    }, [Component]);
    return (
        <div className="w-full h-full min-h-screen py-8 px-6 @container/mdx">
            <MdxFormContainer>
                {Component ? (
                    <Component components={getComponentMap("")} />
                ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <LoadingComponent />
                    </div>
                )}
            </MdxFormContainer>
        </div>
    );
};

MdxPreview.displayName = "MdxPreview";
