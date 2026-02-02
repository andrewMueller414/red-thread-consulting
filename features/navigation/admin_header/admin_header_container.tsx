"use client";
import React, { type ReactNode } from "react";

export const AdminHeaderContainer = (): ReactNode => {
    return (
        <div
            className="w-full max-w-270 flex flex-row justify-start items-center gap-x-6 max-w-1080px mt-8 mb-4"
            id="admin-header-portal-target"
        />
    );
};

AdminHeaderContainer.displayName = "AdminHeaderContainer";
