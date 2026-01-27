import type { trpcServer } from "./server";

export type TrpcServerClient = Awaited<ReturnType<typeof trpcServer>>;

type TrpcResponseData<
    K extends keyof TrpcServerClient,
    L extends keyof TrpcServerClient[K],
> = Awaited<ReturnType<TrpcServerClient[K][L]>>;

export type OnboardingSummaryResponseItem = TrpcResponseData<
    "form",
    "getMany"
>[number];

export type MdxSummaryItem = Awaited<
    ReturnType<TrpcServerClient["mdx"]["getSummaries"]>
>[number];
