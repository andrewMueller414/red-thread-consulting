import React, { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
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

export const adminDropdownItems: DropdownButton[] = [
    {
        label: "Admin Home",
        href: "/admin",
    },
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

interface AdminFloatingButtonListProps {
    close: () => void;
}

export const AdminFloatingButtonList = ({
    close,
}: AdminFloatingButtonListProps): ReactNode => {
    useEffect(() => {
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);
    return (
        <motion.div
            className="w-fit h-fit fixed bottom-20 right-4 flex flex-col justify-end items-end bg-fog/90 border border-pine/30 rounded-lg origin-bottom"
            animate="show"
            initial="hide"
            variants={{
                show: {
                    scaleY: 1,
                    origin: "bottom",
                },
                hide: {
                    scaleY: 0,
                    origin: "bottom",
                },
            }}
        >
            {adminDropdownItems.map((item, i) => {
                const idx = adminDropdownItems.length - i;
                if ("href" in item) {
                    return (
                        <motion.div
                            key={item.label}
                            variants={{
                                hide: {
                                    opacity: 0,
                                },
                                show: {
                                    opacity: 1,
                                },
                            }}
                            transition={{
                                delay: idx * 0.1,
                            }}
                            className="flex flex-row justify-end items-center w-full"
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "w-full h-full text-right px-2 py-3 hover:bg-mist/20 ",
                                    i === 0
                                        ? "rounded-tl-lg rounded-tr-lg"
                                        : i === adminDropdownItems.length
                                            ? "rounded-bl-lg rounded-br-lg"
                                            : "",
                                )}
                                onClick={close}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    );
                } else {
                    return (
                        <motion.a
                            role="button"
                            key={item.label}
                            variants={{
                                hide: {
                                    opacity: 0,
                                },
                                show: {
                                    opacity: 1,
                                },
                            }}
                            transition={{
                                delay: idx * 0.1,
                            }}
                            className={cn(
                                "w-full h-full text-right px-2 py-3 cursor-pointer",
                                item.label.toLowerCase() === "logout"
                                    ? "hover:bg-red-700/20"
                                    : "hover:bg-mist/20 ",
                                i === 0
                                    ? "rounded-tl-lg rounded-tr-lg"
                                    : i === adminDropdownItems.length - 1
                                        ? "rounded-bl-lg rounded-br-lg"
                                        : "",
                            )}
                            onClick={item.onSelect}
                        >
                            {item.label}
                        </motion.a>
                    );
                }
            })}
        </motion.div>
    );
};

AdminFloatingButtonList.displayName = "AdminFloatingButtonList";
