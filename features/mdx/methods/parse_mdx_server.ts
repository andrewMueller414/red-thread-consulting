// import "server-only";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import { EDITOR_THEME } from "../../admin/mdx_management/mdx_editor/editor/mdx_editor";

export const compileMdxServer = async (mdx: string): Promise<string> => {
    return String(
        await compile(mdx, {
            outputFormat: "function-body",
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
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
