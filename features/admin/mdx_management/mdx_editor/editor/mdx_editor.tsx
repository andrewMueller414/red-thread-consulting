"use client";
import React, {
    ComponentProps,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
    BundledLanguage,
    BundledTheme,
    createHighlighter,
    HighlighterGeneric,
} from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { useLocalStorage } from "@uidotdev/usehooks";

export interface MdxEditorProps {
    initialValue: string;
}

declare global {
    interface WindowEventMap {
        "request-editor-content": CustomEvent<null>;
    }
}

type StandaloneEditor = Parameters<
    NonNullable<ComponentProps<typeof Editor>["onMount"]>
>[0];

export const EDITOR_THEME: BundledTheme = "light-plus";

const PREVIEW_DEBOUNCE = 100;

export const MdxEditor = ({ initialValue }: MdxEditorProps): ReactNode => {
    const editorRef = useRef<StandaloneEditor | null>(null);
    const monaco = useMonaco();
    const [body, setBody] = useLocalStorage("editorContent", initialValue);
    const debounce = useRef<NodeJS.Timeout | null>(null);
    const [isReady, setIsReady] = useState(false);
    const highlighterRef = useRef<HighlighterGeneric<
        BundledLanguage,
        BundledTheme
    > | null>(null);

    useEffect(() => {
        window.addEventListener("request-editor-content", () => {
            window.dispatchEvent(
                new CustomEvent("mdx-editor-change", {
                    detail: {
                        value: body ?? initialValue,
                    },
                }),
            );
        });
    }, []);

    useEffect(() => {
        // We only want to run this once when monaco instance is available
        if (!monaco || highlighterRef.current) return;

        const initShiki = async () => {
            // 1. Create the Shiki highlighter with MDX support
            const highlighter = await createHighlighter({
                themes: [EDITOR_THEME],
                langs: ["mdx"],
            });

            highlighterRef.current = highlighter;

            // 2. Explicitly register 'mdx' as a language in Monaco
            // (Monaco has built-in 'markdown', but not 'mdx')
            monaco.languages.register({ id: "mdx" });

            // 3. Connect Shiki's tokenization to Monaco
            shikiToMonaco(highlighter, monaco);

            setIsReady(true);
        };

        initShiki();
    }, [monaco]);

    if (!monaco || !isReady) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center px-8">
                Loading...
            </div>
        );
    }
    return (
        <Editor
            height={"100%"}
            defaultLanguage="mdx"
            defaultValue={body}
            theme={EDITOR_THEME}
            onMount={(editor) => {
                editor.updateOptions({
                    wordWrap: "on",
                });
                editorRef.current = editor;
            }}
            onChange={(val) => {
                if (val) {
                    if (debounce.current) {
                        clearTimeout(debounce.current);
                    }
                    debounce.current = setTimeout(() => {
                        window.dispatchEvent(
                            new CustomEvent("mdx-editor-change", {
                                detail: {
                                    value: val,
                                },
                            }),
                        );
                        setBody(val);
                    }, PREVIEW_DEBOUNCE);
                }
            }}
        />
    );
};

MdxEditor.displayName = "MdxEditor";
