"use client";
import { useForm } from "react-hook-form";
import {
    InputId,
    MdxFormData,
    MdxFormValue,
} from "../../data/schemas/mdx_form_response";
import { useEffect } from "react";

export const useFormInitialValue = (
    name: string,
    inputId: InputId,
    value: MdxFormValue,
) => {
    const form = useForm<MdxFormData>();

    useEffect(() => {
        form.setValue(name, {
            inputId,
            value,
        });
    }, [name, value]);
};
