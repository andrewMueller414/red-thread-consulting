export enum MdxSummaryTableColId {
    firstName = "fistName",
    lastName = "lastName",
    id = "id",
    reviewedAt = "reviewedAt",
    utime = "utime",
}

export const mdxSummaryTableColumnLabelMap: {
    [K in MdxSummaryTableColId]: string;
} = {
    [MdxSummaryTableColId.id]: "Database Id",
    [MdxSummaryTableColId.utime]: "Updated at",
    [MdxSummaryTableColId.reviewedAt]: "Reviewed",
    [MdxSummaryTableColId.lastName]: "Last Name",
    [MdxSummaryTableColId.firstName]: "First Name",
};
