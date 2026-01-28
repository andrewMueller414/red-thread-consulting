import { createTRPCRouter } from "./trpc_init";
import { formRouter } from "./routers/onboarding_router";
import { mdxRouter } from "./routers/mdx";
import { adminRouter } from "./routers/admin";

export const appRouter = createTRPCRouter({
    form: formRouter,
    mdx: mdxRouter,
    admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
