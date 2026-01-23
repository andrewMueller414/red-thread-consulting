"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingSummaryResponseItem } from "@/features/trpc/type_types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { OnboardingTableHeaderById } from "./onboarding_table_header_by_id";
import { OnboardingSummaryTableColumnId } from "./onboarding_table_column_label_map";
import Link from "next/link";
dayjs.extend(advancedFormat);

export const responseTableColumns: ColumnDef<OnboardingSummaryResponseItem>[] =
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
            id: OnboardingSummaryTableColumnId.lastName,
            accessorKey: "name_last",
            header: () => (
                <OnboardingTableHeaderById
                    id={OnboardingSummaryTableColumnId.lastName}
                />
            ),
            cell: ({ row }) => {
                return (
                    <Link
                        href={`/admin/viewOnboardingResponse/${row.getValue(OnboardingSummaryTableColumnId.id)}`}
                    >
                        {row.getValue(OnboardingSummaryTableColumnId.lastName)}
                    </Link>
                );
            },
        },
        {
            id: OnboardingSummaryTableColumnId.firstName,
            accessorKey: "name_first",
            header: () => (
                <OnboardingTableHeaderById
                    id={OnboardingSummaryTableColumnId.firstName}
                />
            ),
            cell: ({ row }) => {
                return (
                    <Link
                        href={`/admin/viewOnboardingResponse/${row.getValue(OnboardingSummaryTableColumnId.id)}`}
                    >
                        {row.getValue(OnboardingSummaryTableColumnId.firstName)}
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
            cell: ({ row }) => {
                const reviewedAt = row.getValue(
                    OnboardingSummaryTableColumnId.reviewedAt,
                ) as string | null;
                if (reviewedAt) {
                    return (
                        <div className="bg-green-700 text-fog px-2 py-1 rounded w-fit">
                            True
                        </div>
                    );
                } else {
                    return (
                        <div className="bg-red-700 text-fog px-2 py-1 rounded w-fit">
                            False
                        </div>
                    );
                }
            },
        },
        {
            id: OnboardingSummaryTableColumnId.id,
            accessorKey: "id",
        },
    ];
