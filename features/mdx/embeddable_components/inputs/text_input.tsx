import React, { type ReactNode } from "react";
import { z } from "zod";
import { getMaxWidthProp } from "../embeddable_component_utils";
import { FormTextInputGroup } from "./form_text_input_group";
import { textInputPropsSchema } from "../../data/schemas/input_props_schemas";
import { PreviewComponentProps } from "../../data/schemas/mdx_form_response";

export type EmbeddableTextInputProps = z.input<typeof textInputPropsSchema>;

export const EmbeddableTextInput = (
    props: EmbeddableTextInputProps & PreviewComponentProps<string>,
): ReactNode => {
    const { maxWidth, ..._props } = textInputPropsSchema.parse(props);
    return (
        <FormTextInputGroup
            {..._props}
            valueOverride={props.valueOverride}
            disabled={props.disabled}
            classes={{
                container: getMaxWidthProp(maxWidth),
            }}
        />
    );
};

EmbeddableTextInput.displayName = "EmbeddableTextInput";
