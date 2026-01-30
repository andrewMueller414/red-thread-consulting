"use client";
import { MdxSummaryItem } from "@/features/trpc/trpc_types";
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import React, { useState, type ReactNode } from "react";
import { mdxSummaryTableColumns } from "./mdx_summary_table_columns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MdxSummaryTableColId } from "./mdx_summary_table_column_label_map";
import { DataTableViewOptions } from "@/core/shared_components/table_utils/table_header_row";
import { PaginationTableFooter } from "@/core/shared_components/table_utils/table_footer_row";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
import { useEventListener } from "@/core/state/hooks/use_event_listener";
import { showMdxDeleteConfirmation } from "../delete_mdx_confirmation_modal/delete_mdx_confirmation_modal_actions";

interface MdxSummaryTableContainerProps {
    items: MdxSummaryItem[];
}

export const MdxSummaryTableContainer = ({
    items,
}: MdxSummaryTableContainerProps): ReactNode => {
    const [data, setData] = useState(items);
    const deleteMutation = trpc.mdx.deleteByIds.useMutation();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            [MdxSummaryTableColId.select]: true,
            [MdxSummaryTableColId.id]: true,
            [MdxSummaryTableColId.ctime]: false,
            [MdxSummaryTableColId.utime]: true,
        });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const table = useReactTable({
        data,
        columns: mdxSummaryTableColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    useEventListener("delete-mdx-success", (e) => {
        table.resetRowSelection();
        setData(
            data.filter((n) => {
                return !e.detail.ids.includes(n.id);
            }),
        );
    });

    const rowSelectionData = table.getFilteredSelectedRowModel();

    return (
        <div className="min-h-full h-full max-w-270 min-w-[min(1080px,90vw)] flex flex-col justify-center items-center gap-y-6">
            <DataTableViewOptions table={table}>
                <Link
                    href="/admin/mdx/editor"
                    className={cn(
                        buttonVariants(),
                        "bg-matcha hover:bg-matcha/90 text-pine hover:text-pine transition-colors duration-300",
                    )}
                >
                    Create
                </Link>
                {rowSelectionData.rows.length ? (
                    <Button
                        onClick={async () => {
                            const idList = rowSelectionData.rows.map(
                                (n) => n.getValue(MdxSummaryTableColId.id) as string,
                            );
                            showMdxDeleteConfirmation({
                                ids: idList,
                            });
                        }}
                        className="bg-red-700 text-fog hover:bg-red-800 hover:text-fog cursor-pointer"
                    >
                        Delete
                    </Button>
                ) : null}
            </DataTableViewOptions>
            <div className="rounded-md border w-full h-fit">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={mdxSummaryTableColumns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <PaginationTableFooter table={table} />
        </div>
    );
};

MdxSummaryTableContainer.displayName = "MdxSummaryTableContainer";
