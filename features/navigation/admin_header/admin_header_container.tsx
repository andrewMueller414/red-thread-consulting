"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { AdminButtonDropdownHeader } from "./admin_header_dropdown_button";

export const AdminHeaderContainer = (): ReactNode => {
    return (
        <div className="w-full h-fit flex flex-row justify-between items-center px-12 py-6">
            <div
                className="flex flex-row justify-center items-center gap-x-6"
                id="admin-header-portal-target"
            />
            <div className="w-fit flex flex-row justify-end items-center gap-6">
                <AdminButtonDropdownHeader />
            </div>
        </div>
    );
};

AdminHeaderContainer.displayName = "AdminHeaderContainer";
