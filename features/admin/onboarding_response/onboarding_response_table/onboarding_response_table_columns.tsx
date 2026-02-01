"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingSummaryResponseSummary } from "@/features/trpc/trpc_types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { OnboardingTableHeaderById } from "./onboarding_table_header_by_id";
import { OnboardingSummaryTableColumnId } from "./onboarding_table_column_label_map";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import { trpc } from "../../../trpc/trpc_provider";
import {
    OnboardingResponseTableAction,
    useOnboardingResponseTableDispatch,
} from "../../state/onboarding_response_table_context";
import { ReactNode } from "react";
dayjs.extend(advancedFormat);

export const responseTableColumns: ColumnDef<OnboardingSummaryResponseSummary>[] =
    [
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
            id: OnboardingSummaryTableColumnId.mdxSourceId,
            accessorKey: "mdxSourceId",
            header: () => (
                <OnboardingTableHeaderById
                    id={OnboardingSummaryTableColumnId.mdxSourceId}
                />
            ),
            cell: ({ row }) => {
                return (
                    <Link
                        href={`/admin/viewFormResponse/${row.getValue(OnboardingSummaryTableColumnId.id)}`}
                    >
                        {row.getValue(OnboardingSummaryTableColumnId.mdxSourceId)}
                    </Link>
                );
            },
        },
        {
            id: OnboardingSummaryTableColumnId.ctime,
            accessorKey: "ctime",
            header: () => (
                <OnboardingTableHeaderById id={OnboardingSummaryTableColumnId.ctime} />
            ),
            cell: ({ row }) => {
                const ctime = row.getValue(
                    OnboardingSummaryTableColumnId.ctime,
                ) as string;
                return <div>{dayjs(ctime).format("dddd, MMMM DD, YYYY h:mm A")}</div>;
            },
        },
        {
            id: OnboardingSummaryTableColumnId.reviewedAt,
            accessorKey: "reviewed_at",
            header: () => (
                <OnboardingTableHeaderById
                    id={OnboardingSummaryTableColumnId.reviewedAt}
                />
            ),
            cell: ({ row }): ReactNode => {
                const reviewedAt = row.getValue(
                    OnboardingSummaryTableColumnId.reviewedAt,
                ) as string | null;
                /* eslint-disable-next-line  -- This actually is a react component... */
                const dispatch = useOnboardingResponseTableDispatch();
                const rowId = row.getValue(OnboardingSummaryTableColumnId.id) as
                    | number
                    | null;
                const mutation = trpc.form.markReviewedById.useMutation();
                const handleToggle = async (): Promise<void> => {
                    if (rowId) {
                        mutation.mutate(
                            {
                                reviewed: !Boolean(reviewedAt),
                                ids: [rowId],
                            },
                            {
                                onSuccess: () => {
                                    dispatch({
                                        type: OnboardingResponseTableAction.setReviewedAt,
                                        payload: {
                                            id: rowId,
                                            value: reviewedAt ? null : new Date(),
                                        },
                                    });
                                },
                            },
                        );
                    }
                };
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className={cn(
                                    "",
                                    reviewedAt
                                        ? "bg-matcha/80 hover:bg-matcha/90 text-pine"
                                        : "bg-red-700/70 hover:bg-red-700/90 text-fog",
                                )}
                            >
                                {reviewedAt ? "True" : "False"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-matcha">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="bg-matcha" onClick={handleToggle}>
                                    {reviewedAt ? "Clear" : "Mark Reviewed"}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            id: OnboardingSummaryTableColumnId.id,
            accessorKey: "id",
        },
    ];
