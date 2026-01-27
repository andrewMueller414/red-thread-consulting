"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface MdxEditorState {
    value: string;
    mdxContentId: string | null;
}

const defaultInitialValues: MdxEditorState = {
    value: "",
    mdxContentId: null,
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

    return (
        <MdxEditorContext.Provider value={state}>
            <MdxEditorDispatchContext.Provider value={dispatch}>
                {children}
            </MdxEditorDispatchContext.Provider>
        </MdxEditorContext.Provider>
    );
};
