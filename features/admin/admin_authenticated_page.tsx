import React, { type ReactNode } from "react";
import { AdminHeaderContainer } from "../navigation/admin_header/admin_header_container";
import { OnboardingResponseTableContainer } from "./onboarding_response/onboarding_response_table/onboarding_response_table_container";
import { trpcServer } from "../trpc/server";
import { fakeOnboardingResponseComplete } from "@/lib/generated/fake-data";

export const AdminAuthenticatedPage = async (): Promise<ReactNode> => {
    const trpc = await trpcServer();

    const items = Array(100)
        .fill(0)
        .map(() => fakeOnboardingResponseComplete());
    return (
        <div className="w-full h-fit min-h-screen flex flex-col justify-start items-center gap-y-8">
            <AdminHeaderContainer />
            <OnboardingResponseTableContainer items={items} />
        </div>
    );
};

AdminAuthenticatedPage.displayName = "AdminAuthenticatedPage";
