"use client";
import React, {
    useEffect,
    useEffectEvent,
    useState,
    type ReactNode,
} from "react";
import { useMdxClientParse } from "../hooks/use_mdx_client_parse";
import { MdxContent } from "../../../mdx/presentation/mdx_content";

export interface MdxEditorChangeEventProps {
    value: string;
}

declare global {
    interface WindowEventMap {
        "mdx-editor-change": CustomEvent<MdxEditorChangeEventProps>;
    }
}

export const MdxPreview = (): ReactNode => {
    const [content, setContent] = useState("");
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
            <MdxContent mdx={content} />
        </div>
    );
};

MdxPreview.displayName = "MdxPreview";
