import React, { type ReactNode } from "react";
import z from "zod";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldTitle,
} from "../../../../components/ui/field";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import {
    CheckboxMeta,
    InputId,
    MdxFormData,
    NestedFormValue,
    PreviewComponentProps,
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";
import { checkboxPropsSchema } from "../../data/schemas/input_props_schemas";

export type EmbeddableCheckboxProps = z.infer<typeof checkboxPropsSchema>;

export const EmbeddableCheckbox = (
    props: EmbeddableCheckboxProps & PreviewComponentProps<boolean, CheckboxMeta>,
): ReactNode => {
    const { title, subtitle, name } =
        props.meta ?? checkboxPropsSchema.parse(props);
    const form = useFormContext<MdxFormData>();
    const value = form.watch(name) as NestedFormValue;
    useFormInitialValue(name, InputId.checkbox, false, {
        title,
        subtitle,
        name,
    });
    return (
        <Field orientation="horizontal">
            <Checkbox
                checked={
                    typeof props.valueOverride === "boolean"
                        ? props.valueOverride
                        : ((value?.value as boolean) ?? false)
                }
                disabled={props.disabled}
                onCheckedChange={(checked) =>
                    form.setValue(name, {
                        value: checked,
                        inputId: InputId.checkbox,
                        meta: {
                            title,
                            subtitle,
                            name,
                        },
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
