import React, { type ReactNode } from "react";
import { z } from "zod";
import { textInputPropsSchema } from "../schemas";
import { getMaxWidthProp } from "../embeddable_component_utils";
import { FormTextInputGroup } from "./form_text_input_group";

export type EmbeddableTextInputProps = z.input<typeof textInputPropsSchema>;

export const EmbeddableTextInput = (
    props: EmbeddableTextInputProps,
): ReactNode => {
    const { maxWidth, ..._props } = textInputPropsSchema.parse(props);
    return (
        <FormTextInputGroup
            {..._props}
            classes={{
                container: getMaxWidthProp(maxWidth),
            }}
        />
    );
};

EmbeddableTextInput.displayName = "EmbeddableTextInput";
