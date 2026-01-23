export enum OnboardingSummaryTableColumnId {
    firstName = "fistName",
    lastName = "lastName",
    id = "id",
    reviewedAt = "reviewedAt",
    ctime = "ctime",
}

export const onboardingResponseTableColumnLabelMap: {
    [K in OnboardingSummaryTableColumnId]: string;
} = {
    [OnboardingSummaryTableColumnId.id]: "Database Id",
    [OnboardingSummaryTableColumnId.ctime]: "Submitted on",
    [OnboardingSummaryTableColumnId.reviewedAt]: "Reviewed",
    [OnboardingSummaryTableColumnId.lastName]: "Last Name",
    [OnboardingSummaryTableColumnId.firstName]: "First Name",
};
