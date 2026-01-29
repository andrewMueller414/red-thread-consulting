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
    const { title, subtitle } = checkboxPropsSchema.parse(props);
    return (
        <Field orientation="horizontal">
            <Checkbox />
            <FieldContent>
                <FieldTitle>{title}</FieldTitle>
                <FieldDescription>{subtitle}</FieldDescription>
            </FieldContent>
        </Field>
    );
};

EmbeddableCheckbox.displayName = "EmbeddableCheckbox";
