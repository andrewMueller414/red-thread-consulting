"use client";
import { useFormContext } from "react-hook-form";
import {
    InputId,
    MdxFormData,
    MdxFormValue,
    NestedFormValue,
} from "../../data/schemas/mdx_form_response";
import { useEffect } from "react";

export const useFormInitialValue = <T extends NestedFormValue["meta"]>(
    name: string,
    inputId: InputId,
    value: MdxFormValue,
    meta: T,
) => {
    const form = useFormContext<MdxFormData>();

    useEffect(() => {
        form.setValue(name, {
            inputId,
            value,
            meta,
        });
    }, [name, value]);
};
