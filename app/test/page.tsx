import { trpcServer } from "@/features/trpc/server";
import React, { type ReactNode } from "react";

const TestPage = async (): Promise<ReactNode> => {
    // TODO: Get mdx content from database here.
    /* const res = await trpcServer. */
    return <div></div>;
};

TestPage.displayName = "TestPage";

export default TestPage;
