"use client";

import { OnboardingSummaryResponseItem } from "@/features/trpc/type_types";
import { ColumnDef } from "@tanstack/react-table";

export enum OnboardingSummaryTableColumnId {
  firstName = "fistName",
  lastName = "lastName",
  id = "id",
  ctime = "ctime",
}

export const responseTableColumns: ColumnDef<OnboardingSummaryResponseItem>[] =
  [
    {
      id: OnboardingSummaryTableColumnId.lastName,
      accessorKey: "name_last",
    },
    {
      id: OnboardingSummaryTableColumnId.firstName,
      accessorKey: "name_first",
    },
    {
      id: OnboardingSummaryTableColumnId.ctime,
      accessorKey: "ctime",
      /* cell: ({ row }) => { */
      /*   return <div>{row}</div>; */
      /* }, */
    },
    {
      id: OnboardingSummaryTableColumnId.id,
      accessorKey: "id",
    },
  ];
