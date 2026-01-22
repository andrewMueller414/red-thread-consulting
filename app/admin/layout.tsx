"use client";
import React, { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = (props: AdminLayoutProps): ReactNode => {
    return <SessionProvider>{props.children}</SessionProvider>;
};

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
