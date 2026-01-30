export enum OnboardingSummaryTableColumnId {
    mdxSourceId = "mdx",
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
    [OnboardingSummaryTableColumnId.mdxSourceId]: "Source",
};
