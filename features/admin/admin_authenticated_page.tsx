import React, { type ReactNode } from "react";
import { AdminHeaderContainer } from "../navigation/admin_header/admin_header_container";
import {
    OnboardingResponse,
    OnboardingResponseTableContainer,
} from "./onboarding_response/onboarding_response_table/onboarding_response_table_container";

export const AdminAuthenticatedPage = (): ReactNode => {
    const items: OnboardingResponse[] = [];
    return (
        <div className="w-full h-fit min-h-screen flex flex-col justify-start items-center gap-y-8">
            <AdminHeaderContainer />
            <OnboardingResponseTableContainer items={items} />
        </div>
    );
};

AdminAuthenticatedPage.displayName = "AdminAuthenticatedPage";
