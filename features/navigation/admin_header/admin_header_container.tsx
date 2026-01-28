"use client";
import React, { type ReactNode } from "react";

export const AdminHeaderContainer = (): ReactNode => {
    return (
        <div className="w-full h-fit flex flex-row justify-between items-center px-12 py-6">
            <div
                className="flex flex-row justify-center items-center gap-x-6"
                id="admin-header-portal-target"
            />
        </div>
    );
};

AdminHeaderContainer.displayName = "AdminHeaderContainer";
