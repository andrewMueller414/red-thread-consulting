import React, { useEffect, useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Route } from "next";

export type DropdownButton =
    | {
        label: string;
        filter?: (pathname: Route) => boolean;
        onSelect: () => void;
    }
    | {
        label: string;
        filter?: (pathname: Route) => boolean;
        href: Route;
    };

interface AdminFloatingButtonListProps {
    close: () => void;
}

export const AdminFloatingButtonList = ({
    close,
}: AdminFloatingButtonListProps): ReactNode => {
    const pathname = usePathname();
    useEffect(() => {
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);
    const adminDropdownItems: DropdownButton[] = useMemo(() => {
        return (
            [
                {
                    label: "Form Responses",
                    href: "/admin",
                },
                {
                    label: "Manage Mdx",
                    href: "/admin/mdx",
                },
                {
                    label: "New Article",
                    href: "/admin/mdx/editor",
                    filter: (pn) => pn !== "/admin/mdx/editor",
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
            ] as DropdownButton[]
        ).filter((item) => {
            if (item.filter) {
                return item.filter(pathname as Route);
            } else {
                return true;
            }
        });
    }, [pathname]);
    return (
        <motion.div
            /* @ts-expect-error -- Type error on framer-motion's end. */
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
                                delay: idx * 0.05,
                            }}
                            /* @ts-expect-error -- Type error on framer-motion's end. */
                            className="flex flex-row justify-end items-center w-full"
                        >
                            <Link
                                href={item.href}
                                aria-disabled={item.href === pathname}
                                className={cn(
                                    "w-full h-full text-right px-2 py-2",
                                    i === 0
                                        ? "rounded-tl-lg rounded-tr-lg"
                                        : i === adminDropdownItems.length
                                            ? "rounded-bl-lg rounded-br-lg"
                                            : "",
                                    item.href === pathname
                                        ? "bg-mist/10 cursor-default"
                                        : "hover:bg-mist/20",
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
                            /* @ts-expect-error -- Type error on framer-motion's end. */
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
                                "w-full h-full text-right px-2 py-2 cursor-pointer",
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
