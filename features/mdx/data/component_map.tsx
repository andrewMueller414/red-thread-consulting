import { FC, ReactNode } from "react";
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
import {
    SubmitForm,
    SubmitFormProps,
} from "../embeddable_components/submit_form";
import {
    EmbeddableImage,
    EmbeddableImageProps,
} from "../embeddable_components/media/image";
import {
    EmbeddableCheckbox,
    EmbeddableCheckboxProps,
} from "../embeddable_components/inputs/checkbox";
import {
    ReorderInputProps,
    SelectInputProps,
} from "./schemas/input_props_schemas";
import {
    Callout,
    CalloutProps,
} from "../embeddable_components/layout/callout/callout";
import { DateTimeInputSchema } from "../embeddable_components/inputs/datetime/date_time_input_schema";
import { DateTimeInputSwitch } from "../embeddable_components/inputs/datetime/date_time_input_switch";
import { SelectInput } from "../embeddable_components/inputs/select";

/* eslint-disable-next-line  -- Need to use any here. */
export const getComponentMap = (): Record<string, FC<any>> => {
    return {
        // HTML
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
        Checkbox: (props: EmbeddableCheckboxProps) => {
            return (
                <MdxErrorBoundary>
                    <EmbeddableCheckbox {...props} />
                </MdxErrorBoundary>
            );
        },
        DateInput: (props: DateTimeInputSchema) => {
            return (
                <MdxErrorBoundary>
                    <DateTimeInputSwitch {...props} />
                </MdxErrorBoundary>
            );
        },
        SelectInput: (props: SelectInputProps) => {
            return (
                <MdxErrorBoundary>
                    <SelectInput {...props} />
                </MdxErrorBoundary>
            );
        },
        Submit: (props: SubmitFormProps) => {
            return (
                <MdxErrorBoundary>
                    <SubmitForm {...props} />
                </MdxErrorBoundary>
            );
        },
        // Media
        Image: (props: EmbeddableImageProps) => {
            return (
                <MdxErrorBoundary>
                    <EmbeddableImage {...props} />
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
        Callout: (props: CalloutProps & { children: ReactNode }) => {
            return (
                <MdxErrorBoundary>
                    <Callout {...props} />
                </MdxErrorBoundary>
            );
        },
    };
};
