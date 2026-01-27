import { defineConfig, s } from "velite";

export default defineConfig({
    collections: {
        docs: {
            name: "Docs", // collection type name
            pattern: "component_docs/**/*.mdx",
            schema: s.object({
                title: s.string().max(99),
                id: s.string().refine((s) => !s.includes(" ")),
                code: s.mdx(),
            }),
        },
    },
});
