import { createTRPCRouter } from "./trpc_init";
import { onboardingRouter } from "./routers/onboarding_router";
import { mdxRouter } from "./routers/mdx";

export const appRouter = createTRPCRouter({
    onboardingForm: onboardingRouter,
    mdx: mdxRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
