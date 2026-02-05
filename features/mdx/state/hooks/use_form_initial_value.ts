"use client";
import { useFormContext } from "react-hook-form";
import {
    AnyMeta,
    InputId,
    MdxFormData,
    MdxFormValue,
} from "../../data/schemas/mdx_form_response";
import { useEffect, useEffectEvent, useState } from "react";

declare global {
    interface WindowEventMap {
        "set-new-form-name": CustomEvent<string>;
    }
}

export const useFormInitialValue = <T extends AnyMeta>(
    name: string,
    inputId: InputId,
    value: MdxFormValue,
    meta: T,
) => {
    const [haveSet, setHaveSet] = useState(false);
    const form = useFormContext<MdxFormData>();

    const handleInitialData = useEffectEvent(() => {
        if (haveSet) {
            return;
        }
        form.setValue(name, {
            inputId,
            value,
            meta,
        });
        window.dispatchEvent(
            new CustomEvent("set-new-form-name", {
                detail: name,
                bubbles: true,
            }),
        );
        setHaveSet(true);
    });

    useEffect(() => {
        handleInitialData();
    }, [name, value, inputId, meta]);
};
