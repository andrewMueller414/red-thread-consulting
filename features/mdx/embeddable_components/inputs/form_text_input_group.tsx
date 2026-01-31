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
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";

interface FormTextInputGroupProps {
    label: string;
    desc?: string;
    placeholder?: string;
    required?: boolean;
    name: string;
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
    classes = {},
    styles = {},
}: FormTextInputGroupProps & PreviewComponentProps<string>): ReactNode => {
    const form = useFormContext<MdxFormData>();
    const value = form.watch(name);
    useFormInitialValue(name, InputId.text, "", {
        placeholder,
        label,
        desc,
    });
    return (
        <Field className={classes.container} style={styles.container}>
            <FieldLabel>{label}</FieldLabel>
            {desc ? <FieldDescription>{desc}</FieldDescription> : null}
            <Input
                type="text"
                placeholder={placeholder}
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
