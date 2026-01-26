// import "server-only";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

export const compileMdxServer = async (mdx: string): Promise<string> => {
    return String(
        await compile(mdx, {
            outputFormat: "function-body",
            remarkPlugins: [remarkGfm],
            /* …otherOptions */
        }),
    );
};
