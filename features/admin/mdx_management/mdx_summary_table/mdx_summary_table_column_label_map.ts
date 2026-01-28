export enum MdxSummaryTableColId {
    select = "select",
    id = "id",
    utime = "utime",
    ctime = "ctime",
    actions = "action",
}

export const mdxSummaryTableColumnLabelMap: {
    [K in MdxSummaryTableColId]: string;
} = {
    [MdxSummaryTableColId.select]: "Select",
    [MdxSummaryTableColId.id]: "Database Id",
    [MdxSummaryTableColId.utime]: "Updated at",
    [MdxSummaryTableColId.ctime]: "Created at",
    [MdxSummaryTableColId.actions]: "Actions",
};
