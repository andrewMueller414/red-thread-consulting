import React, { type ReactNode } from "react";
import {
    OnboardingFormSectionItem,
    OnboardingFormType,
} from "../onboarding_types";
import { cn } from "@/lib/utils";

interface OnboardingSectionFormProps {
    item: OnboardingFormSectionItem;
    float: "right" | "left";
    form: OnboardingFormType;
}

export const OnboardingSectionForm = ({
    item,
    float,
    form,
}: OnboardingSectionFormProps): ReactNode => {
    const { Body } = item;
    return (
        <div
            className={cn(
                "w-full h-full flex flex-col justify-start items-center mt-8 lg:mt-0",
                float === "right" ? "lg:items-start" : "lg:items-end",
            )}
        >
            <div className="text-3xl font-bellefair">{item.title}</div>
            <div
                className={cn(
                    "text-moss text-sm text-center",
                    float === "left" ? "lg:w-full lg:text-right" : "lg:text-left",
                )}
            >
                {item.subtitle}
            </div>
            <div className="@container/onboarding-item-body w-full grow mt-8">
                <Body form={form} float={float} />
            </div>
        </div>
    );
};

OnboardingSectionForm.displayName = "OnboardingSectionForm";
