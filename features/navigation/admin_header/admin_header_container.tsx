"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { type ReactNode } from "react";

export const AdminHeaderContainer = (): ReactNode => {
    return (
        <div className="w-full h-fit flex flex-row justify-between items-center px-12 py-6">
            <div
                className="flex flex-row justify-center items-center gap-x-6"
                id="admin-header-portal-target"
            />
            <div className="w-fit flex flex-row justify-end items-center gap-6">
                <Link
                    className={cn(
                        buttonVariants(),
                        "bg-matcha/30 hover:bg-matcha/60 transition-colors duration-300",
                    )}
                    href="/admin/mdx"
                >
                    Manage Mdx
                </Link>
                <Button
                    className="bg-red-700 hover:bg-red-800 text-fog hover:text-fog transition-colors duration-300"
                    onClick={() => signOut()}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

AdminHeaderContainer.displayName = "AdminHeaderContainer";
