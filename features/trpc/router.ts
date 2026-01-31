import { createTRPCRouter } from "./trpc_init";
import { mdxRouter } from "./routers/mdx";
import { adminRouter } from "./routers/admin";
import { formRouter } from "./routers/form";

export const appRouter = createTRPCRouter({
    form: formRouter,
    mdx: mdxRouter,
    admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
