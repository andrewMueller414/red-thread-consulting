import React, { type ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AdminAuthenticatedPage } from "./admin_authenticated_page";
import { AdminUnAuthenticatedPage } from "./admin_unauthenticated_page";

export const AdminPageContainer = async (): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    if (session) {
        return <AdminAuthenticatedPage />;
    } else {
        return <AdminUnAuthenticatedPage />;
    }
};

AdminPageContainer.displayName = "AdminPageContainer";
