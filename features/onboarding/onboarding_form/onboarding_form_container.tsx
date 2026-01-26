"use client";
import React, { type ReactNode } from "react";
import { onboardingSections } from "../data/onboarding_sections";
import { OnboardingFormSection } from "./onboarding_form_section";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "../data/onboarding_form_schema";
import { z } from "zod";
import { OnboardingFullWidthFormSection } from "./onboarding_full_width_form_section";
import {
    OnboardingFullWidthFormSectionItem,
    OnboardingGridLayoutFormSectionItem,
} from "../onboarding_types";
import { PriorityId } from "@/lib/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

export const OnboardingFormContainer = (): ReactNode => {
    const form = useForm({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: {
            name_first: "",
            name_last: "",
            how_can_i_help: "",
            priorities: [
                PriorityId.FINANCIAL_INDEPENDENCE,
                PriorityId.SOCIAL_WELFARE,
                PriorityId.GIVING_BACK,
                PriorityId.COMMITTMENT,
                PriorityId.GROWTH,
                PriorityId.IMPACT,
            ],
        },
    });

    const handleSubmit = async (
        data: z.infer<typeof onboardingFormSchema>,
    ): Promise<void> => {
        console.log("data: ", data);
    };

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    {onboardingSections.map((section, i) => {
                        if (section.image === "full-width-body") {
                            return (
                                <OnboardingFullWidthFormSection
                                    item={section as OnboardingFullWidthFormSectionItem}
                                    form={form}
                                    key={`onboarding-sec-${section.title}`}
                                    float="full-width"
                                />
                            );
                        }
                        return (
                            <OnboardingFormSection
                                key={`onboard-sec-${section.title}`}
                                item={section as OnboardingGridLayoutFormSectionItem}
                                idx={i}
                                form={form}
                            />
                        );
                    })}
                    <div className="w-full flex flex-row justify-center lg:justify-start items-center my-12">
                        <Button
                            className="bg-mist text-fog hover:bg-mist/80 hover:text-fog min-w-50"
                            type="submit"
                        >
                            <SendIcon />
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

OnboardingFormContainer.displayName = "OnboardingFormContainer";
