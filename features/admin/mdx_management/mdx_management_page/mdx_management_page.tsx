import { trpc } from "@/features/trpc/server";
import React, { type ReactNode } from "react";
import { MdxSummaryTableContainer } from "../mdx_summary_table/mdx_summary_table_container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { DeleteMdxConfirmationModal } from "../delete_mdx_confirmation_modal/delete_mdx_confirmation_modal";

export const MdxManagementPage = async (): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/admin");
    }
    const res = await trpc.mdx.getSummaries();
    return (
        <div className="w-full flex flex-col justify-start items-center min-h-screen py-16 px-8">
            <MdxSummaryTableContainer items={res} />
            <DeleteMdxConfirmationModal />
        </div>
    );
};

MdxManagementPage.displayName = "MdxManagementPage";
