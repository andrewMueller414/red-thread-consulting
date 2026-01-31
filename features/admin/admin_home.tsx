"use client";
import { SessionProvider } from "next-auth/react";
import React, { type ReactNode } from "react";

export const AdminHome = ({
    children,
    authenticated,
}: {
    children: ReactNode;
    authenticated: boolean;
}): ReactNode => {
    return <SessionProvider>{children}</SessionProvider>;
};

AdminHome.displayName = "AdminHome";
