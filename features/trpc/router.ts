import { createTRPCRouter } from "./trpc_init";
import { formRouter } from "./routers/onboarding_router";
import { mdxRouter } from "./routers/mdx";

export const appRouter = createTRPCRouter({
    form: formRouter,
    mdx: mdxRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
