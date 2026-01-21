"use client";
import { AppState } from "@/core/state/store";
import React, { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";

import { connect } from "react-redux";
import { navButtons } from "./header";

const connector = connect((state: AppState) => ({
    open: state.nav.drawer.open,
}));

interface DrawerProps {
    open: boolean;
    navbarHeight: number;
}

export const Drawer = connector((props: DrawerProps): ReactNode => {
    const height = useMemo(
        () =>
            typeof window === "undefined"
                ? 0
                : window.innerHeight - props.navbarHeight,
        [props.navbarHeight],
    );
    return (
        <motion.div
            animate={props.open ? "open" : "close"}
            initial="close"
            variants={{
                open: {
                    height: `${height}px`,
                    opacity: 1,
                },
                close: {
                    height: 0,
                    opacity: 0,
                },
            }}
            className="w-full fixed bottom-0 left-0 right-0 origin-bottom bg-background flex flex-col justify-center items-center overflow-y-auto"
        >
            {navButtons.map((b, i) => {
                return (
                    <motion.a
                        className="w-full inline-block px-4 py-4 text-center drawer-fontsize"
                        key={`drawer-${b.href}`}
                        href={b.href}
                        animate={props.open ? "open" : "close"}
                        initial="close"
                        variants={{
                            open: {
                                opacity: 1,
                            },
                            close: {
                                opacity: 0,
                            },
                        }}
                        transition={{
                            delay: i * 0.1 + 0.5,
                        }}
                    >
                        {b.label}
                    </motion.a>
                );
            })}
        </motion.div>
    );
});

Drawer.displayName = "Drawer";
