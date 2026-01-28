"use client";
import React, { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/features/trpc/trpc_provider";
import { AdminButtonDropdownHeader } from "../../features/navigation/admin_header/admin_header_dropdown_button";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = (props: AdminLayoutProps): ReactNode => {
    return (
        <SessionProvider>
            <TRPCProvider>
                {props.children}
                <AdminButtonDropdownHeader />
            </TRPCProvider>
        </SessionProvider>
    );
};

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
