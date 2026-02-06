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
import { typedSearchParamRoute } from "../../../../core/utils/url_utils";
import { Route } from "next";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
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
                <Link href={editUrl as Route} className="w-full">
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
            const csvMutation = trpc.form.getReponseDataById.useMutation();
            const viewUrl = encodeURI(`/articles/${rowId}`);

            const sp = new URLSearchParams();
            sp.set("id", rowId);

            const editUrl = encodeURI(`/admin/mdx/editor?${sp.toString()}`);

            const responseSp = new URLSearchParams();
            responseSp.set("articleId", rowId);

            const responsesUrl = typedSearchParamRoute("/admin", responseSp);
            const handleExportData = async (): Promise<void> => {
                csvMutation.mutate(
                    {
                        id: rowId,
                    },
                    {
                        onError: (err) => {
                            console.log("err: ", err);
                            showNotification({
                                title: "Oh no",
                                variant: "info",
                                message: "Something went wrong while trying to export data.",
                                duration: 5000,
                            });
                        },
                        onSuccess(data) {
                            if (data?.content) {
                                const byteCharacters = atob(data.content);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], {
                                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = data.filename;
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                            }
                        },
                    },
                );
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-transparent hover:bg-matcha/50 transition-colors duration-300">
                            <IconDots />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-matcha">
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={viewUrl as Route}>
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={responsesUrl}>
                                Responses
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportData}>
                            Export Data
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full h-full" href={editUrl as Route}>
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
