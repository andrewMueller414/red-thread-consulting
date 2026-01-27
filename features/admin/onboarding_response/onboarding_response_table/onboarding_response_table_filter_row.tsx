"use client";
import { Input } from "@/components/ui/input";
import React, { type ReactNode } from "react";
import {
    OnboardingResponseTableAction,
    useOnboardingResponseTableContext,
    useOnboardingResponseTableDispatch,
} from "../../state/onboarding_response_table_context";
import { TableHeaderColumnSelect } from "./table_header_column_select";
import { Table } from "@tanstack/react-table";
import { FormResponse } from "@/lib/generated/prisma/client";

export const OnboardingResponseTableFilterRow = ({
    table,
}: {
    table: Table<FormResponse>;
}): ReactNode => {
    const tableState = useOnboardingResponseTableContext();
    const tableDispatch = useOnboardingResponseTableDispatch();
    return (
        <div className="w-full flex flex-row justify-start items-end mb-4">
            <div className="flex flex-col justify-end items-start">
                <div>Search</div>
                <Input
                    value={tableState.filterText}
                    onChange={(e) => {
                        tableDispatch({
                            type: OnboardingResponseTableAction.setFilterText,
                            payload: e.target.value,
                        });
                    }}
                    className="py-2"
                />
            </div>
            <TableHeaderColumnSelect table={table} />
        </div>
    );
};

OnboardingResponseTableFilterRow.displayName =
    "OnboardingResponseTableFilterRow";
