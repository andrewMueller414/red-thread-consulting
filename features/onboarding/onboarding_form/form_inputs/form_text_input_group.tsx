import React, { type ReactNode } from "react";
import { OnboardingFormType } from "../../onboarding_types";
import { OnboardingFormData } from "../../data/onboarding_form_schema";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FormTextInputGroupProps {
    label: string;
    desc?: string;
    placeholder: string;
    form: OnboardingFormType;
    name: keyof OnboardingFormData;
    classes?: {
        input?: string;
    };
}

export const FormTextInputGroup = ({
    label,
    desc,
    placeholder,
    form,
    name,
    classes = {},
}: FormTextInputGroupProps): ReactNode => {
    const value = form.watch(name) as string;
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <Input
                type="text"
                placeholder={placeholder}
                required
                value={value}
                onChange={(e) => form.setValue(name, e.target.value)}
                className={classes.input}
            />
            {desc ? <FieldDescription>{desc}</FieldDescription> : null}
        </Field>
    );
};

FormTextInputGroup.displayName = "FormTextInputGroup";
