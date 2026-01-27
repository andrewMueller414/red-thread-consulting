import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import React, { type ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { textInputPropsSchema } from "../schemas";
import { cn } from "@/lib/utils";
import { getMaxWidthProp as getMaxWidthClassName } from "../embeddable_component_utils";

export type EmbeddableTextAreaInputProps = z.input<typeof textInputPropsSchema>;

export const EmbeddableTextAreaInput = (
    props: EmbeddableTextAreaInputProps,
): ReactNode => {
    const { maxWidth, label, placeholder, name } =
        textInputPropsSchema.parse(props);
    const form = useForm();
    return (
        <Field className={cn("mt-8", getMaxWidthClassName(maxWidth))}>
            <FieldLabel>{label}</FieldLabel>
            <Textarea
                value={form.watch(name) as string}
                onChange={(e) => form.setValue(name, e.target.value)}
                placeholder={placeholder}
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

EmbeddableTextAreaInput.displayName = "EmbeddableTextAreaInput";
