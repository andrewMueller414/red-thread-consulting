import { FormResponse } from "@/lib/generated/prisma/client";
import React, { type ReactNode } from "react";
import { OnboardingResponseTable } from "./onboarding_response_table";
import { OnboardingResponseTableProvider } from "../../state/onboarding_response_table_context";

interface OnboardingResponseTableContainerProps {
    items: FormResponse[];
}

export const OnboardingResponseTableContainer = (
    props: OnboardingResponseTableContainerProps,
): ReactNode => {
    console.log("props.items: ", props.items);
    return (
        <div className="w-full max-w-[min(1080px,90vw)]">
            <OnboardingResponseTableProvider
                initialValues={{
                    responseSummaries: props.items,
                    filteredSummaries: props.items,
                    filterText: "",
                }}
            >
                <OnboardingResponseTable />
            </OnboardingResponseTableProvider>
        </div>
    );
};

OnboardingResponseTableContainer.displayName =
    "OnboardingResponseTableContainer";
