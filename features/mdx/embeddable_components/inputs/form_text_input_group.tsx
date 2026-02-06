"use client";
import React, { CSSProperties, type ReactNode } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import {
    InputId,
    MdxFormData,
    PreviewComponentProps,
    TextInputMeta,
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";
import { TextInputProps } from "../../data/schemas/input_props_schemas";

interface FormTextInputGroupProps extends TextInputProps {
    required?: boolean;
    name: string;
    type: TextInputMeta["type"];
    classes?: {
        input?: string;
        container?: string;
    };
    styles?: {
        input?: CSSProperties;
        container?: CSSProperties;
    };
}

export const FormTextInputGroup = ({
    label,
    desc,
    placeholder,
    name,
    required,
    disabled,
    valueOverride,
    type = "text",
    classes = {},
    styles = {},
    ..._props
}: FormTextInputGroupProps &
    PreviewComponentProps<string, TextInputMeta>): ReactNode => {
    const form = useFormContext<MdxFormData>();
    const value = form.watch(name);
    useFormInitialValue<TextInputMeta>(name, InputId.text, "", {
        placeholder,
        label,
        desc,
        type,
        name,
        inputId: InputId.text,
        ..._props,
    });
    return (
        <Field className={classes.container} style={styles.container}>
            <FieldLabel>{label}</FieldLabel>
            {desc ? <FieldDescription>{desc}</FieldDescription> : null}
            <Input
                type={type}
                placeholder={placeholder ?? undefined}
                disabled={disabled}
                required={required}
                value={valueOverride ?? (value?.value as string) ?? ""}
                onChange={(e) =>
                    form.setValue(name, {
                        value: e.target.value,
                        inputId: InputId.text,
                        meta: {
                            placeholder,
                            label,
                            desc,
                            type,
                            name,
                            inputId: InputId.text,
                            ..._props,
                        },
                    })
                }
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
