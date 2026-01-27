import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormResponse } from "@/lib/generated/prisma/client";
import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { type ReactNode } from "react";
import { onboardingResponseTableColumnLabelMap } from "./onboarding_table_column_label_map";

interface TableHeaderColumnSelectProps {
    table: Table<FormResponse>;
}

export const TableHeaderColumnSelect = ({
    table,
}: TableHeaderColumnSelectProps): ReactNode => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="ml-auto bg-matcha text-pine hover:bg-matcha/90 hover:text-pine">
                    Columns <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-matcha text-pine">
                <DropdownMenuGroup>
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={`col-select-${column.id}`}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    className="hover:bg-matcha/80 bg-matcha text-pine focus:bg-pine hover:text-fog focus:text-fog transition-colors duration-200"
                                >
                                    {column.id in onboardingResponseTableColumnLabelMap
                                        ? onboardingResponseTableColumnLabelMap[
                                        column.id as keyof typeof onboardingResponseTableColumnLabelMap
                                        ]
                                        : column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

TableHeaderColumnSelect.displayName = "TableHeaderColumnSelect";
