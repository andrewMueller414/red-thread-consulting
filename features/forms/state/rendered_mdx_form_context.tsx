"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface RenderedMdxFormState {
    mdxSourceId: string;
}

const defaultInitialValues: RenderedMdxFormState = {
    mdxSourceId: "",
};

export const RenderedMdxFormContext =
    createContext<RenderedMdxFormState>(defaultInitialValues);

type RenderedMdxFormContextActions = {
    type: "setMdxSourceId";
    payload: string;
};

export const RenderedMdxFormDispatchContext = createContext<
    React.Dispatch<RenderedMdxFormContextActions>
>(null!);

export const useRenderedMdxFormContext = () =>
    useContext(RenderedMdxFormContext);
export const useRenderedMdxFormDispatch = () =>
    useContext(RenderedMdxFormDispatchContext);

export const RenderedMdxFormContextReducer = (
    state: RenderedMdxFormState,
    action: RenderedMdxFormContextActions,
): RenderedMdxFormState => {
    switch (action.type) {
        case "setMdxSourceId": {
            return {
                ...state,
                mdxSourceId: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

RenderedMdxFormContextReducer.displayName = "RenderedMdxFormContextReducer";

interface RenderedMdxFormProviderProps {
    children: ReactNode;
    initialValues: RenderedMdxFormState;
}

export const RenderedMdxFormProvider = ({
    children,
    initialValues,
}: RenderedMdxFormProviderProps) => {
    const [state, dispatch] = useReducer(
        RenderedMdxFormContextReducer,
        initialValues,
    );

    return (
        <RenderedMdxFormContext.Provider value={state}>
            <RenderedMdxFormDispatchContext.Provider value={dispatch}>
                {children}
            </RenderedMdxFormDispatchContext.Provider>
        </RenderedMdxFormContext.Provider>
    );
};
