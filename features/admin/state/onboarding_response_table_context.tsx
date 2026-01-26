"use client";
import { OnboardingSummaryResponseItem } from "@/features/trpc/trpc_types";
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
    /// Pass an array of ids to remove those ids from both the unfiltered and filtered summaries
    filterSummariesByIds,
    setReviewedByIds,
    updateItem,
}

type OnboardingResponseTableContextActions =
    | {
        type: OnboardingResponseTableAction.setResponseSummaries;
        payload: OnboardingSummaryResponseItem[];
    }
    | {
        type: OnboardingResponseTableAction.setReviewedByIds;
        payload: {
            ids: number[];
            reviewed: null | Date;
        };
    }
    | {
        type: OnboardingResponseTableAction.updateItem;
        payload: OnboardingSummaryResponseItem;
    }
    | {
        type: OnboardingResponseTableAction.filterSummariesByIds;
        payload: number[];
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
        case OnboardingResponseTableAction.setReviewedByIds: {
            return {
                ...state,
                responseSummaries: state.responseSummaries.map((s) => {
                    if (action.payload.ids.includes(s.id)) {
                        return {
                            ...s,
                            reviewed_at: action.payload.reviewed,
                        };
                    } else {
                        return s;
                    }
                }),
                filteredSummaries: state.filteredSummaries.map((s) => {
                    if (action.payload.ids.includes(s.id)) {
                        return {
                            ...s,
                            reviewed_at: action.payload.reviewed,
                        };
                    } else {
                        return s;
                    }
                }),
            };
        }
        case OnboardingResponseTableAction.filterSummariesByIds: {
            return {
                ...state,
                responseSummaries: state.responseSummaries.filter(
                    (f) => !action.payload.includes(f.id),
                ),
                filteredSummaries: state.filteredSummaries.filter(
                    (f) => !action.payload.includes(f.id),
                ),
            };
        }
        case OnboardingResponseTableAction.updateItem: {
            return {
                ...state,
                responseSummaries: state.responseSummaries.map((n) =>
                    n.id === action.payload.id ? action.payload : n,
                ),
                filteredSummaries: state.filteredSummaries.map((n) =>
                    n.id === action.payload.id ? action.payload : n,
                ),
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
    initialValues?: OnboardingResponseTableState;
}

export const OnboardingResponseTableProvider = ({
    children,
    initialValues,
}: OnboardingResponseTableProviderProps) => {
    const [state, dispatch] = useReducer(
        OnboardingResponseTableContextReducer,
        initialValues ? initialValues : defaultInitialValues,
    );

    return (
        <OnboardingResponseTableContext.Provider value={state}>
            <OnboardingResponseTableDispatchContext.Provider value={dispatch}>
                {children}
            </OnboardingResponseTableDispatchContext.Provider>
        </OnboardingResponseTableContext.Provider>
    );
};
