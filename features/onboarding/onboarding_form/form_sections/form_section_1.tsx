import React, { type ReactNode } from "react";
import { OnboardingFormType } from "../../onboarding_types";
import { FormTextInputGroup } from "../form_inputs/form_text_input_group";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { ErrorMessage } from "@hookform/error-message";

interface FormSectionOneProps {
    form: OnboardingFormType;
}

export const FormSectionOne = ({ form }: FormSectionOneProps): ReactNode => {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-start @w-[300px]/onboarding-item-body:grid grid-cols-2 gap-y-8">
                <FormTextInputGroup
                    placeholder="First name"
                    form={form}
                    label="First Name"
                    name="name_first"
                    classes={{
                        input: "w-full",
                    }}
                />
                <FormTextInputGroup
                    placeholder="Last name"
                    form={form}
                    label="Last Name"
                    name="name_last"
                    classes={{
                        input: "w-full",
                    }}
                />
            </div>
            <Field className="mt-8">
                <FieldLabel>How can I help?</FieldLabel>
                <Textarea
                    value={form.watch("how_can_i_help") as string}
                    onChange={(e) => form.setValue("how_can_i_help", e.target.value)}
                />
                <ErrorMessage
                    name={"how_can_i_help"}
                    render={({ message }) => {
                        return (
                            <div className="text-sm font-mono text-red-700">{message}</div>
                        );
                    }}
                />
            </Field>
        </>
    );
};

FormSectionOne.displayName = "FormSectionOne";
