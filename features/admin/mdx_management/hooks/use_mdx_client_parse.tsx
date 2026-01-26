import { compileMdxServer } from "@/features/mdx/methods/parse_mdx_server";
import { run } from "@mdx-js/mdx";
import { useState } from "react";
import * as runtime from "react/jsx-runtime";
import { Fragment } from "react/jsx-runtime";
import type { MDXModule } from "mdx/types";

export const useMdxClientParse = () => {
    const [mdxModule, setMdxModule] = useState<MDXModule | null>(null);
    const _parseMdx = async (c: string): Promise<void> => {
        const compiledMdx = await compileMdxServer(c);
        const res = await run(compiledMdx, {
            Fragment: Fragment,
            jsx: runtime.jsx,
            jsxs: runtime.jsxs,
            // jsxDEV: devRuntime.jsxDEV,
            baseUrl: import.meta.url,
        });
        if (res.default.name === "MDXContent") {
            setMdxModule(res);
        } else {
            setMdxModule(null);
        }
    };

    return [
        mdxModule?.default ? mdxModule.default : null,
        async (newContent: string) => {
            await _parseMdx(newContent);
        },
    ] as [MDXModule | null, (newContent: string) => Promise<void>];
};
