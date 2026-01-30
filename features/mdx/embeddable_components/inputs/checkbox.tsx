import React, { type ReactNode } from "react";
import z from "zod";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldTitle,
} from "../../../../components/ui/field";
import { Checkbox } from "../../../../components/ui/checkbox";
import { embeddableInputSchema } from "../shared_schemas";
import { useForm } from "react-hook-form";
import {
    InputId,
    MdxForm,
    MdxFormData,
    MdxFormInput,
    NestedFormValue,
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";

const checkboxPropsSchema = embeddableInputSchema.extend({
    title: z
        .string({ message: "Please provide a title" })
        .describe("The titledisplayed with the checkbox."),
    subtitle: z.string().optional(),
});

export type EmbeddableCheckboxProps = z.infer<typeof checkboxPropsSchema>;

export const EmbeddableCheckbox = (
    props: EmbeddableCheckboxProps,
): ReactNode => {
    const { title, subtitle, name } = checkboxPropsSchema.parse(props);
    const form = useForm<MdxFormData>();
    const value = form.watch(name) as NestedFormValue;
    useFormInitialValue(name, InputId.checkbox, false);
    return (
        <Field orientation="horizontal">
            <Checkbox
                checked={(value?.value as boolean) ?? false}
                onCheckedChange={(checked) =>
                    form.setValue(name, {
                        value: checked,
                        inputId: InputId.checkbox,
                    })
                }
            />
            <FieldContent>
                <FieldTitle>{title}</FieldTitle>
                <FieldDescription>{subtitle}</FieldDescription>
            </FieldContent>
        </Field>
    );
};

EmbeddableCheckbox.displayName = "EmbeddableCheckbox";
