"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MdxSummaryItem } from "@/features/trpc/trpc_types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import { MdxSummaryTableHeaderById } from "./mdx_summary_table_header_by_id";
import { MdxSummaryTableColId } from "./mdx_summary_table_column_label_map";
dayjs.extend(advancedFormat);

export const mdxSummaryTableColumns: ColumnDef<MdxSummaryItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: MdxSummaryTableColId.utime,
        accessorKey: "utime",
        header: () => <MdxSummaryTableHeaderById id={MdxSummaryTableColId.utime} />,
        cell: ({ row }) => {
            const utime = row.getValue(MdxSummaryTableColId.utime) as string;
            return <div>{dayjs(utime).format("dddd, MMMM DD, YYYY h:mm A")}</div>;
        },
    },
    {
        id: MdxSummaryTableColId.id,
        accessorKey: "id",
    },
];
