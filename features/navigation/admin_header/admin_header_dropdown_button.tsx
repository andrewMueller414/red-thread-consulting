import React, { type ReactNode } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export type DropdownButton =
    | {
        label: string;
        onSelect: () => void;
    }
    | {
        label: string;
        href: string;
    };

const dropdownItems: DropdownButton[] = [
    {
        label: "Manage Mdx",
        href: "/admin/mdx",
    },
    {
        label: "Media",
        href: "/admin/media",
    },
    {
        label: "Documentation",
        href: "/docs",
    },
    {
        label: "Logout",
        onSelect: signOut,
    },
];

export const AdminButtonDropdownHeader = (): ReactNode => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-matcha hover:bg-matcha/90 text-pine absolute top-4 right-4">
                    Admin
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-matcha text-pine">
                {dropdownItems.map((item) => {
                    if ("href" in item) {
                        return (
                            <Link key={item.label} href={item.href}>
                                <DropdownMenuItem>{item.label}</DropdownMenuItem>
                            </Link>
                        );
                    } else {
                        return (
                            <DropdownMenuItem key={item.label} onClick={item.onSelect}>
                                {item.label}
                            </DropdownMenuItem>
                        );
                    }
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

AdminButtonDropdownHeader.displayName = "AdminButtonDropdownHeader";
