import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query_client";
import { appRouter } from "./router";
import { createCallerFactory, createTRPCContext } from "./trpc_init";

export const getQueryClient = cache(makeQueryClient);

const callerFactory = createCallerFactory(appRouter);

const caller = callerFactory(createTRPCContext);

const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
    caller,
    getQueryClient,
);

export { trpc, HydrateClient };

export const trpcServer = async () => {
    const context = await createTRPCContext();
    return callerFactory(context);
};
