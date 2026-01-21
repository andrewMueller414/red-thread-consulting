import React, { type ReactNode } from "react";
import { OnboardingFormContainer } from "./onboarding_form/onboarding_form_container";

export const OnboardingPageComponent = (): ReactNode => {
    return (
        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
            <OnboardingFormContainer />
        </div>
    );
};

OnboardingPageComponent.displayName = "OnboardingPageComponent";
