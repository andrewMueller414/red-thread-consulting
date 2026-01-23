import { createTRPCRouter } from "./trpc_init";
import { onboardingRouter } from "./routers/onboarding_router";

export const appRouter = createTRPCRouter({
    onboardingForm: onboardingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
