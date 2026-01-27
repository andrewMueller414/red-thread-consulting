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
import {
    useMdxEditorContext,
    useMdxEditorDispatch,
} from "../state/mdx_editor_context";

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

export const MdxEditor = ({ initialValue }: MdxEditorProps): ReactNode => {
    const editorRef = useRef<StandaloneEditor | null>(null);
    const monaco = useMonaco();
    const { value: body } = useMdxEditorContext();
    const dispatch = useMdxEditorDispatch();
    const setBody = (value: string): void => {
        dispatch({
            type: "setValue",
            payload: value,
        });
    };
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
                        value: editorRef.current?.getValue
                            ? editorRef.current!.getValue()
                            : initialValue,
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

    const handleSave = (): void => {
        const val = editorRef.current?.getValue();
        if (!val) {
            return;
        }
        console.log(`Value: ${val}`);
    };

    return (
        <Editor
            height={"100%"}
            defaultLanguage="mdx"
            defaultValue={body}
            value={body}
            theme={EDITOR_THEME}
            onMount={(editor) => {
                editor.updateOptions({
                    wordWrap: "on",
                });
                editor.addAction({
                    label: "Save",
                    run: handleSave,
                    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyS],
                    id: "saveEditor",
                });
                editorRef.current = editor;
            }}
            onChange={(val) => {
                if (val) {
                    window.dispatchEvent(
                        new CustomEvent("mdx-editor-change", {
                            detail: {
                                value: val,
                            },
                        }),
                    );
                    setBody(val);
                }
            }}
        />
    );
};

MdxEditor.displayName = "MdxEditor";
