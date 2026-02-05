import { AdminPageContainer } from "@/features/admin/admin_page_container";
import React, { type ReactNode } from "react";

interface Props {
    searchParams: Promise<{
        articleId?: string;
    }>;
}

const AdminPage = async (props: Props): Promise<ReactNode> => {
    const { articleId } = await props.searchParams;
    return <AdminPageContainer initialNoteFilter={articleId} />;
};

AdminPage.displayName = "AdminPage";

export default AdminPage;
