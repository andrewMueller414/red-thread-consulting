import React, { type ReactNode } from "react";
import { z } from "zod";
import { FormTextInputGroup } from "./form_text_input_group";
import { textInputPropsSchema } from "../../data/schemas/input_props_schemas";
import {
    PreviewComponentProps,
    TextInputMeta,
} from "../../data/schemas/mdx_form_response";

export type EmbeddableTextInputProps = z.input<typeof textInputPropsSchema>;

export const EmbeddableTextInput = (
    props: EmbeddableTextInputProps &
        PreviewComponentProps<string, TextInputMeta>,
): ReactNode => {
    const { width, ..._props } = props.meta ?? textInputPropsSchema.parse(props);
    return (
        <FormTextInputGroup
            {..._props}
            valueOverride={props.valueOverride}
            disabled={props.disabled}
            width={width}
            classes={{
                container: width,
            }}
            meta={props.meta}
        />
    );
};

EmbeddableTextInput.displayName = "EmbeddableTextInput";
