import { OnboardingPageComponent } from "@/features/onboarding/onboarding_page";
import React, { type ReactNode } from "react";

interface OnboardingPageProps {
    searchParams: {
        user?: string;
    };
}

const OnboardingPage = ({ searchParams }: OnboardingPageProps): ReactNode => {
    console.log("searchParams: ", searchParams);
    return <OnboardingPageComponent />;
};

OnboardingPage.displayName = "OnboardingPage";

export default OnboardingPage;
