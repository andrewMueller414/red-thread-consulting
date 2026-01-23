import React, { type ReactNode } from "react";
import {
    onboardingResponseTableColumnLabelMap,
    OnboardingSummaryTableColumnId,
} from "./onboarding_table_column_label_map";

interface OnboardingTableHeaderByIdProps {
    id: OnboardingSummaryTableColumnId;
}

export const OnboardingTableHeaderById = (
    props: OnboardingTableHeaderByIdProps,
): ReactNode => {
    return <div>{onboardingResponseTableColumnLabelMap[props.id]}</div>;
};

OnboardingTableHeaderById.displayName = "OnboardingTableHeaderById";
