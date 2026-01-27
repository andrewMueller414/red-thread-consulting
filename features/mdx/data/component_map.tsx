import { FC } from "react";
import { H1, H2, H3, H4 } from "../../../core/shared_components/typography";
import {
    EmbeddableTextInput,
    EmbeddableTextInputProps,
} from "../embeddable_components/inputs/text_input";
import { MdxErrorBoundary } from "../embeddable_components/mdx_error_boundary";
import { EmbeddableTextAreaInput } from "../embeddable_components/inputs/text_area_input";
import {
    FormGrid,
    FormGridProps,
} from "../embeddable_components/layout/form_grid/form_grid";
import {
    AlignmentProps,
    EmbeddableAlignmentComponent,
} from "../embeddable_components/layout/column/embeddable_column";
import { ReorderInput } from "../embeddable_components/inputs/reorder_input/reorder_input";
import { ReorderInputProps } from "../embeddable_components/inputs/reorder_input/reorder_types";

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
        ReorderInput: (props: ReorderInputProps) => {
            return (
                <MdxErrorBoundary>
                    <ReorderInput {...props} />
                </MdxErrorBoundary>
            );
        },
        // Layout
        Grid: (props: FormGridProps) => {
            return (
                <MdxErrorBoundary>
                    <FormGrid {...props} />
                </MdxErrorBoundary>
            );
        },
        Align: (props: AlignmentProps) => {
            return (
                <MdxErrorBoundary>
                    <EmbeddableAlignmentComponent {...props} />
                </MdxErrorBoundary>
            );
        },
    };
};
