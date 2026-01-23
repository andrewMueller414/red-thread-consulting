"use client";
import React, { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface AdminHeaderPortalProps {
    children: ReactNode;
}

export const AdminHeaderPortal = ({
    children,
}: AdminHeaderPortalProps): ReactNode => {
    const em = document.getElementById("admin-header-portal-target");
    if (em) {
        return createPortal(children, em);
    }
    return null;
};

AdminHeaderPortal.displayName = "AdminHeaderPortal";
