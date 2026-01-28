import { Button } from "@/components/ui/button";
import { MdxSummaryItem } from "@/features/trpc/trpc_types";
import { FormResponse, MdxContent } from "@/lib/generated/prisma/client";
import { Table } from "@tanstack/react-table";
import React, { type ReactNode } from "react";

type J = FormResponse | MdxSummaryItem;

interface PaginationTableFooterProps<T extends J> {
  table: Table<T>;
}

export const PaginationTableFooter = <T extends J>({
  table,
}: PaginationTableFooterProps<T>): ReactNode => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4 w-full">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="select-none bg-matcha text-pine hover:bg-matcha/90 hover:text-pine"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="select-none bg-matcha text-pine hover:bg-matcha/90 hover:text-pine"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

PaginationTableFooter.displayName = "PaginationTableFooter";
