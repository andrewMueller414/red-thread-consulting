import React, { type ReactNode } from "react";
import { useEventListener } from "../../../../../core/state/hooks/use_event_listener";
import {
    useMdxEditorContext,
    useMdxEditorDispatch,
} from "./mdx_editor_context";

export const FormFieldNameListener = (): ReactNode => {
    const state = useMdxEditorContext();
    const dispatch = useMdxEditorDispatch();

    return null;
};

FormFieldNameListener.displayName = "FormFieldNameListener";
