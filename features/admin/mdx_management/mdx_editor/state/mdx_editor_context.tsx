"use client";
import { useEventListener } from "@/core/state/hooks/use_event_listener";
import {
    ReactNode,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from "react";
import { FormFieldNameListener } from "./mdx_editor_form_field_name_listener";

export interface MdxEditorState {
    value: string;
    mdxContentId: string | null;
    formFieldNames: string[];
}

const defaultInitialValues: MdxEditorState = {
    value: "",
    mdxContentId: null,
    formFieldNames: [],
};

export const MdxEditorContext =
    createContext<MdxEditorState>(defaultInitialValues);

type MdxEditorContextActions =
    | {
        type: "setValue";
        payload: string;
    }
    | {
        type: "setMdxContentId";
        payload: string | null;
    }
    | {
        type: "appendFormFieldName";
        payload: string;
    };

export const MdxEditorDispatchContext = createContext<
    React.Dispatch<MdxEditorContextActions>
>(null!);

export const useMdxEditorContext = () => useContext(MdxEditorContext);
export const useMdxEditorDispatch = () => useContext(MdxEditorDispatchContext);

export const MdxEditorContextReducer = (
    state: MdxEditorState,
    action: MdxEditorContextActions,
): MdxEditorState => {
    switch (action.type) {
        case "setValue": {
            return {
                ...state,
                value: action.payload,
            };
        }
        case "setMdxContentId": {
            console.log(`Here?`);
            return {
                ...state,
                mdxContentId: action.payload,
            };
        }
        case "appendFormFieldName": {
            return {
                ...state,
                formFieldNames: state.formFieldNames.includes(action.payload)
                    ? state.formFieldNames
                    : [...state.formFieldNames, action.payload],
            };
        }
    }
};

MdxEditorContextReducer.displayName = "MdxEditorContextReducer";

interface MdxEditorProviderProps {
    children: ReactNode;
    initialValues: MdxEditorState;
}

export const MdxEditorProvider = ({
    children,
    initialValues,
}: MdxEditorProviderProps) => {
    const [state, dispatch] = useReducer(MdxEditorContextReducer, initialValues);

    useEventListener("set-new-form-name", (e) => {
        if (!state.formFieldNames.includes(e.detail)) {
            dispatch({
                type: "appendFormFieldName",
                payload: e.detail,
            });
        }
    });

    useEffect(() => {
        console.log("state: ", state);
    }, [state]);
    return (
        <MdxEditorContext.Provider value={state}>
            <MdxEditorDispatchContext.Provider value={dispatch}>
                <FormFieldNameListener />
                {children}
            </MdxEditorDispatchContext.Provider>
        </MdxEditorContext.Provider>
    );
};
