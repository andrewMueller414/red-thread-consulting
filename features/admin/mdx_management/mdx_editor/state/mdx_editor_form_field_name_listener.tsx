import React, { type ReactNode } from "react";
import { useEventListener } from "../../../../../core/state/hooks/use_event_listener";
import {
    useMdxEditorContext,
    useMdxEditorDispatch,
} from "./mdx_editor_context";

export const FormFieldNameListener = (): ReactNode => {
    const state = useMdxEditorContext();
    const dispatch = useMdxEditorDispatch();

    useEventListener("set-new-form-name", (e) => {
        if (!state.formFieldNames.includes(e.detail)) {
            dispatch({
                type: "appendFormFieldName",
                payload: e.detail,
            });
        }
    });
    return null;
};

FormFieldNameListener.displayName = "FormFieldNameListener";
