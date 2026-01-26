import React, { type ReactNode } from "react";
import {
    MdxSummaryTableColId,
    mdxSummaryTableColumnLabelMap,
} from "./mdx_summary_table_column_label_map";

interface MdxSummaryTableHeaderByIdProps {
    id: MdxSummaryTableColId;
}

export const MdxSummaryTableHeaderById = (
    props: MdxSummaryTableHeaderByIdProps,
): ReactNode => {
    return <div>{mdxSummaryTableColumnLabelMap[props.id]}</div>;
};

MdxSummaryTableHeaderById.displayName = "MdxSummaryTableHeaderById";
