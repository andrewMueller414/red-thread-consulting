// import "server-only";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import rehypeCallouts, { type UserOptions } from "rehype-callouts";
import { EDITOR_THEME } from "../../admin/mdx_management/mdx_editor/editor/mdx_editor";

export const compileMdxServer = async (mdx: string): Promise<string> => {
    return String(
        await compile(mdx, {
            outputFormat: "function-body",
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                [
                    rehypeCallouts,
                    {
                        showIndicator: false,
                        theme: "vitepress",
                        callouts: {
                            pine: {
                                title: "Pine",
                            },
                            mist: {
                                title: "Mist",
                            },
                            fog: {
                                title: "Fog",
                            },
                            moss: {
                                title: "Moss",
                            },
                            dust: {
                                title: "Dust",
                            },
                            matcha: {
                                title: "Matcha",
                            },
                            cream: {
                                title: "Cream",
                            },
                        },
                    } satisfies UserOptions,
                ],
                [
                    rehypeShiki,
                    {
                        themes: {
                            dark: EDITOR_THEME,
                            light: EDITOR_THEME,
                        },
                    },
                ],
            ],
            /* …otherOptions */
        }),
    );
};
