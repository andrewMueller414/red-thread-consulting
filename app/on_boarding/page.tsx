import React, { type ReactNode } from "react";

interface OnboardingPageProps {
    searchParams: {
        user?: string;
    };
}

const OnboardingPage = (_: OnboardingPageProps): ReactNode => {
    return <div>Not sure what I&apos;m going to put here to be honest</div>;
};

OnboardingPage.displayName = "OnboardingPage";

export default OnboardingPage;
