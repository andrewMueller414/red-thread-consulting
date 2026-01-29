import React, { type ReactNode } from "react";
import { AdminHome } from "../../features/admin/admin_home";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = async (props: AdminLayoutProps): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    return (
        <>
            <AdminHome authenticated={Boolean(session)}>{props.children}</AdminHome>
        </>
    );
};

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
