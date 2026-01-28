"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MdxSummaryItem } from "@/features/trpc/trpc_types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import { IconDots } from "@tabler/icons-react";
import { MdxSummaryTableHeaderById } from "./mdx_summary_table_header_by_id";
import { MdxSummaryTableColId } from "./mdx_summary_table_column_label_map";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { showMdxDeleteConfirmation } from "../delete_mdx_confirmation_modal/delete_mdx_confirmation_modal_actions";
dayjs.extend(advancedFormat);

export const mdxSummaryTableColumns: ColumnDef<MdxSummaryItem>[] = [
    {
        id: MdxSummaryTableColId.select,
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
        id: MdxSummaryTableColId.id,
        accessorKey: "id",
        cell: ({ row }) => {
            const rowId = row.getValue(MdxSummaryTableColId.id) as string;
            const sp = new URLSearchParams();
            sp.set("id", rowId);

            const editUrl = encodeURI(`/admin/mdx/editor?${sp.toString()}`);
            return (
                <Link href={editUrl} className="w-full">
                    {rowId}
                </Link>
            );
        },
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
        id: MdxSummaryTableColId.ctime,
        accessorKey: "ctime",
        header: () => <MdxSummaryTableHeaderById id={MdxSummaryTableColId.utime} />,
        cell: ({ row }) => {
            const ctime = row.getValue(MdxSummaryTableColId.ctime) as string;
            return <div>{dayjs(ctime).format("dddd, MMMM DD, YYYY h:mm A")}</div>;
        },
    },
    {
        id: MdxSummaryTableColId.actions,
        maxSize: 120,
        enableSorting: false,
        enableHiding: false,
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
            const rowId = row.getValue(MdxSummaryTableColId.id) as string;
            const viewUrl = encodeURI(`/articles/${rowId}`);

            const sp = new URLSearchParams();
            sp.set("id", rowId);

            const editUrl = encodeURI(`/admin/mdx/editor?${sp.toString()}`);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-transparent hover:bg-matcha/50 transition-colors duration-300">
                            <IconDots />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-matcha">
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={viewUrl}>
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={editUrl}>
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                                showMdxDeleteConfirmation({
                                    ids: [rowId],
                                });
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
