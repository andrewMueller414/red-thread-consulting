"use client";
import React, { CSSProperties, type ReactNode } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

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
    classes = {},
    styles = {},
}: FormTextInputGroupProps): ReactNode => {
    const form = useForm();
    const value = form.watch(name) as string;
    return (
        <Field className={classes.container} style={styles.container}>
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
