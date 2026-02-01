import React, { type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { MdxFormData } from "../../../data/schemas/mdx_form_response";
import { DateTimeInputSchemaOutput } from "./date_time_input_schema";

export const DateInput = (props: DateTimeInputSchemaOutput): ReactNode => {
    const form = useFormContext<MdxFormData>();
    return <div></div>;
};

DateInput.displayName = "DateInput";
