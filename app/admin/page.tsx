import { AdminPageContainer } from "@/features/admin/admin_page_container";
import { getServerSession } from "next-auth";
import React, { type ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AdminPage = async (): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);

    if (session) {
        return <AdminPageContainer />;
    } else {
        redirect("/admin");
    }
};

AdminPage.displayName = "AdminPage";

export default AdminPage;
