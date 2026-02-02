import React, { type ReactNode } from "react";
import { MdxFormData } from "../../../../mdx/data/schemas/mdx_form_response";
import { H2 } from "../../../../../core/shared_components/typography";
import { FormResponseInputSwitch } from "./form_response_input_switch";

interface FormResponseInputViewProps {
    data: MdxFormData[string];
    name: string;
}

export const FormResponseInputView = ({
    data,
    name,
}: FormResponseInputViewProps): ReactNode => {
    return (
        <div className="w-full mt-8">
            <H2 className="mb-8">{name}</H2>
            <FormResponseInputSwitch data={data} />
        </div>
    );
};

FormResponseInputView.displayName = "FormResponseInputView";
