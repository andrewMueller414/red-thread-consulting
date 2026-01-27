import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import React, { type ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { textInputPropsSchema } from "../schemas";
import { cn } from "@/lib/utils";
import { getMaxWidthProp } from "../embeddable_component_utils";

const textAreaInputProps = textInputPropsSchema.extend({
    rows: z.number().int().default(3),
});

export type EmbeddableTextAreaInputProps = z.input<typeof textAreaInputProps>;

export const EmbeddableTextAreaInput = (
    props: EmbeddableTextAreaInputProps,
): ReactNode => {
    const { maxWidth, label, placeholder, name, rows } =
        textAreaInputProps.parse(props);
    const form = useForm();
    return (
        <Field className={cn("mt-8 w-full", getMaxWidthProp(maxWidth))}>
            <FieldLabel>{label}</FieldLabel>
            <Textarea
                value={form.watch(name) as string}
                onChange={(e) => form.setValue(name, e.target.value)}
                placeholder={placeholder}
                className="w-full"
                rows={rows}
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
