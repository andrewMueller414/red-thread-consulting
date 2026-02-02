import React, { type ReactNode } from "react";
import {
    InputId,
    MdxFormData,
} from "../../../../mdx/data/schemas/mdx_form_response";
import { H2 } from "../../../../../core/shared_components/typography";
import { FormResponseInputSwitch } from "./form_response_input_switch";

interface FormResponseInputViewProps {
    data: MdxFormData[string];
    name: string;
}

const inputIdLabelMap: { [K in InputId]: string } = {
    [InputId.text]: "Text Input",
    [InputId.textArea]: "Multiline Text Input",
    [InputId.checkbox]: "Checkbox Input",
    [InputId.reorder]: "Reorder Input",
    [InputId.dateTime]: "Date Time Input",
    [InputId.select]: "Select Input",
};

export const FormResponseInputView = ({
    data,
    name,
}: FormResponseInputViewProps): ReactNode => {
    console.log("data, name: ", data, name);
    return (
        <div className="w-full mt-8">
            <H2>{name}</H2>
            <div className="text-moss/80 font-semibold mb-8">{`Type: ${inputIdLabelMap[data.inputId]}`}</div>
            <FormResponseInputSwitch data={data} />
        </div>
    );
};

FormResponseInputView.displayName = "FormResponseInputView";
