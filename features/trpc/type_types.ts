import type { trpcServer } from "./server";

export type TrpcServerClient = Awaited<ReturnType<typeof trpcServer>>;

export type OnboardingSummaryResponseItem = Awaited<
    ReturnType<TrpcServerClient["onboardingForm"]["getManySummaries"]>
>[number];
