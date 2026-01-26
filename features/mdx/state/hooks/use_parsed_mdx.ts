import { run } from "@mdx-js/mdx";
import { useEffect, useEffectEvent, useState } from "react";
import * as runtime from "react/jsx-runtime";

type MDXContent = Awaited<ReturnType<typeof run>>["default"];

export const useParsedMdx = (compiledMdx: string): MDXContent | null => {
    const [Component, setComponent] = useState<null | MDXContent>(null);

    const runCode = useEffectEvent(async (mdx: string): Promise<void> => {
        const { default: Content } = await run(mdx, {
            ...runtime,
            baseUrl: import.meta.url,
        });
        setComponent(Content);
    });

    useEffect(() => {
        runCode(compiledMdx);
    }, [compiledMdx]);

    return Component;
};
