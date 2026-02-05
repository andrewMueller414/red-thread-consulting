import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MdxEditorPageComponent } from "@/features/admin/mdx_management/mdx_editor/mdx_editor_page";
import { trpc } from "@/features/trpc/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";
import { SaveEditorNotification } from "../../../../features/notifications/presentation/save_editor_notification";
import "./editor_page.scss";

interface MdxEditorPageProps {
    searchParams: Promise<{
        id?: string;
    }>;
}

const MdxEditorPage = async ({
    searchParams,
}: MdxEditorPageProps): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/admin");
    }
    const { id } = await searchParams;
    const item = id
        ? await trpc.mdx.getById({
            id,
        })
        : null;
    return (
        <>
            <MdxEditorPageComponent editingItem={item} />;
            <SaveEditorNotification />
        </>
    );
};

MdxEditorPage.displayName = "MdxEditorPage";

export default MdxEditorPage;
