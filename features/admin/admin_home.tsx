"use client";
import { SessionProvider } from "next-auth/react";
import React, { type ReactNode } from "react";
import { TRPCProvider } from "../trpc/trpc_provider";

export const AdminHome = ({
    children,
    authenticated,
}: {
    children: ReactNode;
    authenticated: boolean;
}): ReactNode => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

AdminHome.displayName = "AdminHome";
