import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import React, { type ReactNode } from "react";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getMaxWidthProp } from "../embeddable_component_utils";
import {
    InputId,
    MdxFormData,
    PreviewComponentProps,
    TextAreaMeta,
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";
import { textAreaInputProps } from "../../data/schemas/input_props_schemas";

export type EmbeddableTextAreaInputProps = z.input<typeof textAreaInputProps>;

export const EmbeddableTextAreaInput = (
    props: EmbeddableTextAreaInputProps & PreviewComponentProps<string>,
): ReactNode => {
    const { maxWidth, label, placeholder, name, rows, desc } =
        textAreaInputProps.parse(props);
    const form = useFormContext<MdxFormData>();
    useFormInitialValue<TextAreaMeta>(name, InputId.textArea, "", {
        label,
        placeholder,
        desc,
        rows,
    });
    return (
        <Field className={cn("mt-8 w-full", getMaxWidthProp(maxWidth))}>
            <FieldLabel>{label}</FieldLabel>
            <Textarea
                value={props.valueOverride ?? (form.watch(name)?.value as string) ?? ""}
                disabled={props.disabled}
                onChange={(e) =>
                    form.setValue(name, {
                        value: e.target.value,
                        inputId: InputId.textArea,
                        meta: {
                            label,
                            placeholder,
                            desc,
                            rows,
                        } satisfies TextAreaMeta,
                    })
                }
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
            {desc ? <FieldDescription>{desc}</FieldDescription> : null}
        </Field>
    );
};

EmbeddableTextAreaInput.displayName = "EmbeddableTextAreaInput";
