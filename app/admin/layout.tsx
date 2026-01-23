"use client";
import React, { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/features/trpc/trpc_provider";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = (props: AdminLayoutProps): ReactNode => {
    return (
        <SessionProvider>
            <TRPCProvider>{props.children}</TRPCProvider>
        </SessionProvider>
    );
};

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
