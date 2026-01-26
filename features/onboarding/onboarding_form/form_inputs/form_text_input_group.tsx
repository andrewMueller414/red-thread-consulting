"use client";
import React, { type ReactNode } from "react";
import { OnboardingFormType } from "../../onboarding_types";
import { OnboardingFormData } from "../../data/onboarding_form_schema";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";

interface FormTextInputGroupProps {
    label: string;
    desc?: string;
    placeholder: string;
    form: OnboardingFormType;
    required?: boolean;
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
    required,
    classes = {},
}: FormTextInputGroupProps): ReactNode => {
    const value = form.watch(name) as string;
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            {desc ? <FieldDescription>{desc}</FieldDescription> : null}
            <Input
                type="text"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => form.setValue(name, e.target.value)}
                className={classes.input}
            />
            <ErrorMessage
                name={name}
                render={({ message }) => {
                    return (
                        <div className="text-sm font-mono text-red-700">{message}</div>
                    );
                }}
            />
        </Field>
    );
};

FormTextInputGroup.displayName = "FormTextInputGroup";
