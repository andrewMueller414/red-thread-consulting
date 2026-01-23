"use client";
import React, { type ReactNode } from "react";
import { onboardingSections } from "../data/onboarding_sections";
import { OnboardingFormSection } from "./onboarding_form_section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "../data/onboarding_form_schema";
import { z } from "zod";

export const OnboardingFormContainer = (): ReactNode => {
    const form = useForm({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: {
            name_first: "",
            name_last: "",
        },
    });

    const handleSubmit = async (
        data: z.infer<typeof onboardingFormSchema>,
    ): Promise<void> => {
        console.log("data: ", data);
    };

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {onboardingSections.map((section, i) => {
                    return (
                        <OnboardingFormSection
                            key={`onboard-sec-${section.image.src}`}
                            item={section}
                            idx={i}
                            form={form}
                        />
                    );
                })}
            </form>
        </div>
    );
};

OnboardingFormContainer.displayName = "OnboardingFormContainer";
