import { FC } from "react";
import { H1, H2, H3, H4 } from "../../../core/shared_components/typography";
import { FormSectionOne } from "@/features/onboarding/onboarding_form/form_sections/form_section_1";
import {
    EmbeddableTextInput,
    EmbeddableTextInputProps,
} from "../embeddable_components/inputs/text_input";
import { MdxErrorBoundary } from "../embeddable_components/mdx_error_boundary";
import { EmbeddableTextAreaInput } from "../embeddable_components/inputs/text_area_input";

/* eslint-disable-next-line  -- Need to use any here. */
export const getComponentMap = (): Record<string, FC<any>> => {
    return {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        // Inputs
        TextInput: (props: EmbeddableTextInputProps) => {
            return (
                <MdxErrorBoundary>
                    <EmbeddableTextInput {...props} />
                </MdxErrorBoundary>
            );
        },
        MultiLineTextInput: (props: EmbeddableTextInputProps) => {
            return (
                <MdxErrorBoundary>
                    <EmbeddableTextAreaInput {...props} />
                </MdxErrorBoundary>
            );
        },
    };
};
