"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React, { type ReactNode } from "react";

export const AdminHeaderContainer = (): ReactNode => {
    return (
        <div className="w-full h-fit flex flex-row justify-between items-center px-12 py-6">
            <div
                className="flex flex-row justify-center items-center gap-x-6"
                id="admin-header-portal-target"
            />
            <Button
                className="bg-matcha hover:bg-matcha/90"
                onClick={() => signOut()}
            >
                Logout
            </Button>
        </div>
    );
};

AdminHeaderContainer.displayName = "AdminHeaderContainer";
