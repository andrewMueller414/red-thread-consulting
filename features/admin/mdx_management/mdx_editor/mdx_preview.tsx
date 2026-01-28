"use client";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { MdxContent } from "../../../mdx/presentation/mdx_content";
import { useMdxEditorContext } from "./state/mdx_editor_context";

const DEBOUNCE = 250; // Just to avoid parsing mdx on every keystroke.

export interface MdxEditorChangeEventProps {
    value: string;
}

export const MdxPreview = (): ReactNode => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [debounced, setDebounced] = useState("");
    const { value } = useMdxEditorContext();

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            setDebounced(value);
        }, DEBOUNCE);
    }, [value]);

    return (
        <div className="w-full min-h-screen py-8 pb-12 px-6 @container/mdx">
            <MdxContent mdx={debounced} />
        </div>
    );
};

MdxPreview.displayName = "MdxPreview";
