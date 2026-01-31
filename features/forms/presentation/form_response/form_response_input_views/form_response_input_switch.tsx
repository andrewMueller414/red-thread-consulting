import React, { type ReactNode } from "react";
import {
    CheckboxMeta,
    InputId,
    MdxFormData,
    ReorderMeta,
    TextAreaMeta,
    TextInputMeta,
} from "../../../../mdx/data/schemas/mdx_form_response";
import { EmbeddableCheckbox } from "../../../../mdx/embeddable_components/inputs/checkbox";
import { EmbeddableTextAreaInput } from "../../../../mdx/embeddable_components/inputs/text_area_input";
import { ReorderInput } from "../../../../mdx/embeddable_components/inputs/reorder_input/reorder_input";
import { EmbeddableTextInput } from "../../../../mdx/embeddable_components/inputs/text_input";

interface FormResponseInputSwitchProps {
    data: MdxFormData[string];
}

export const FormResponseInputSwitch = (
    props: FormResponseInputSwitchProps,
): ReactNode => {
    switch (props.data.inputId) {
        case InputId.checkbox: {
            const meta = props.data.meta as CheckboxMeta;
            return (
                <EmbeddableCheckbox
                    name="preview1"
                    valueOverride={props.data.value as boolean}
                    disabled
                    {...meta}
                />
            );
        }

        case InputId.text: {
            const meta = props.data.meta as TextInputMeta;
            return (
                <EmbeddableTextInput
                    name="preview2"
                    valueOverride={props.data.value as string}
                    disabled
                    {...meta}
                />
            );
        }
        case InputId.textArea: {
            const meta = props.data.meta as TextAreaMeta;
            return (
                <EmbeddableTextAreaInput
                    name="preview3"
                    valueOverride={props.data.value as string}
                    disabled
                    {...meta}
                />
            );
        }
        case InputId.reorder: {
            const meta = props.data.meta as ReorderMeta;
            const options = [];
            const value = props.data.value as string[];
            console.log("meta: ", meta);
            for (const val of value) {
                const opt = meta.options.find((f) => f.value === val);
                if (opt) {
                    options.push(opt);
                }
            }
            return (
                <ReorderInput
                    name="preview4"
                    disabled
                    {...meta}
                    options={options}
                    classes={{
                        container: "py-0",
                    }}
                />
            );
        }
    }
};

FormResponseInputSwitch.displayName = "FormResponseInputSwitch";
