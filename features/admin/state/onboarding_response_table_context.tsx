"use client";
import { OnboardingSummaryResponseItem } from "@/features/trpc/type_types";
import { ReactNode, createContext, useReducer, useContext } from "react";
import { getFilteredResponseSummaries } from "../admin_utils";

export interface OnboardingResponseTableState {
    responseSummaries: OnboardingSummaryResponseItem[];
    filterText: string;
    filteredSummaries: OnboardingSummaryResponseItem[];
}

const defaultInitialValues: OnboardingResponseTableState = {
    responseSummaries: [],
    filteredSummaries: [],
    filterText: "",
};

export const OnboardingResponseTableContext =
    createContext<OnboardingResponseTableState>(defaultInitialValues);

export enum OnboardingResponseTableAction {
    setResponseSummaries,
    setFilterText,
}

type OnboardingResponseTableContextActions =
    | {
        type: OnboardingResponseTableAction.setResponseSummaries;
        payload: OnboardingSummaryResponseItem[];
    }
    | {
        type: OnboardingResponseTableAction.setFilterText;
        payload: string;
    };

export const OnboardingResponseTableDispatchContext = createContext<
    React.Dispatch<OnboardingResponseTableContextActions>
>(null!);

export const useOnboardingResponseTableContext = () =>
    useContext(OnboardingResponseTableContext);
export const useOnboardingResponseTableDispatch = () =>
    useContext(OnboardingResponseTableDispatchContext);

export const OnboardingResponseTableContextReducer = (
    state: OnboardingResponseTableState,
    action: OnboardingResponseTableContextActions,
): OnboardingResponseTableState => {
    switch (action.type) {
        case OnboardingResponseTableAction.setResponseSummaries: {
            return {
                ...state,
                responseSummaries: action.payload,
                filteredSummaries: action.payload,
            };
        }
        case OnboardingResponseTableAction.setFilterText: {
            return {
                ...state,
                filterText: action.payload,
                filteredSummaries: getFilteredResponseSummaries(
                    state.responseSummaries,
                    action.payload,
                ),
            };
        }
    }
};

OnboardingResponseTableContextReducer.displayName =
    "OnboardingResponseTableContextReducer";

interface OnboardingResponseTableProviderProps {
    children: ReactNode;
    initialValues?: Partial<OnboardingResponseTableState>;
}

export const OnboardingResponseTableProvider = ({
    children,
    initialValues,
}: OnboardingResponseTableProviderProps) => {
    const [state, dispatch] = useReducer(
        OnboardingResponseTableContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues,
    );

    return (
        <OnboardingResponseTableContext.Provider value={state}>
            <OnboardingResponseTableDispatchContext.Provider value={dispatch}>
                {children}
            </OnboardingResponseTableDispatchContext.Provider>
        </OnboardingResponseTableContext.Provider>
    );
};
