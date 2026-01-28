"use client";
import React, { type ReactNode } from "react";
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
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
import { responseTableColumns } from "./onboarding_response_table_columns";
import {
    OnboardingResponseTableAction,
    useOnboardingResponseTableContext,
    useOnboardingResponseTableDispatch,
} from "../../state/onboarding_response_table_context";
import { OnboardingResponseTableFilterRow } from "./onboarding_response_table_filter_row";
import { OnboardingSummaryTableColumnId } from "./onboarding_table_column_label_map";
import { AdminHeaderPortal } from "@/features/navigation/admin_header/admin_header_portal";
import { Button } from "@/components/ui/button";
import { trpc } from "@/features/trpc/trpc_provider";
import { OnboardingSummaryResponseItem } from "@/features/trpc/trpc_types";
import { PaginationTableFooter } from "@/core/shared_components/table_utils/table_footer_row";

export const OnboardingResponseTable = (): ReactNode => {
    const tableState = useOnboardingResponseTableContext();
    const tableDispatch = useOnboardingResponseTableDispatch();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            [OnboardingSummaryTableColumnId.id as string]: false,
        });
    const [rowSelection, setRowSelection] = React.useState({});
    const deleteById = trpc.form.deleteById.useMutation();
    const markRead = trpc.form.markReviewedById.useMutation();
    const table = useReactTable({
        data: tableState.filteredSummaries,
        columns: responseTableColumns,
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
    const getSelectedIds = (): { id: number }[] => {
        return table.getFilteredSelectedRowModel().rows.map((r) => {
            return {
                id: r.getValue(OnboardingSummaryTableColumnId.id) as number,
            };
        });
    };
    const anyItemIsNotReviewed = (
        selectedRows: Row<OnboardingSummaryResponseItem>[],
    ) =>
        selectedRows.some(
            (n) => !n.getValue(OnboardingSummaryTableColumnId.reviewedAt),
        );
    const handleMarkRead = (): void => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;
        markRead.mutate(
            {
                reviewed: anyItemIsNotReviewed(selectedRows) ? true : false,
                ids: selectedRows.map(
                    (row) => row.getValue(OnboardingSummaryTableColumnId.id) as number,
                ),
            },
            {
                onSuccess: (data, params) => {
                    if (data) {
                        tableDispatch({
                            type: OnboardingResponseTableAction.setReviewedByIds,
                            payload: {
                                reviewed: params.reviewed ? new Date() : null,
                                ids: params.ids,
                            },
                        });
                        table.resetRowSelection();
                    }
                },
                onError: (err) => {
                    console.error("Error: ", err.message);
                },
            },
        );
    };
    const handleDelete = (): void => {
        const selectedIds = getSelectedIds();

        deleteById.mutate(selectedIds, {
            onError: (err) => console.error("Error: ", err.message),
            onSuccess: (responseData) => {
                console.log("responseData: ", responseData);
                if (responseData) {
                    tableDispatch({
                        type: OnboardingResponseTableAction.filterSummariesByIds,
                        payload: selectedIds.map((n) => n.id),
                    });
                }
                table.resetRowSelection();
            },
        });
    };
    return (
        <>
            <OnboardingResponseTableFilterRow table={table} />
            <div className="rounded-md border">
                <Table>
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
                                    colSpan={responseTableColumns.length}
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
            {table.getFilteredSelectedRowModel().rows.length ? (
                <AdminHeaderPortal>
                    <Button onClick={handleDelete} variant="destructive">
                        Delete
                    </Button>
                    <Button
                        onClick={handleMarkRead}
                        className="bg-matcha hover:bg-matcha/90 text-pine hover:text-pine"
                    >
                        {`Mark ${anyItemIsNotReviewed(table.getSelectedRowModel().rows) ? "Reviewed" : "Not Reviewed"}`}
                    </Button>
                </AdminHeaderPortal>
            ) : null}
        </>
    );
};

OnboardingResponseTable.displayName = "OnboardingResponseTable";
