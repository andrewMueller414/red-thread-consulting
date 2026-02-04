"use client";
import { AppState } from "@/core/state/store";
import React, { useEffect, useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { connect } from "react-redux";
import { navButtons } from "./header";
import { DrawerButton } from "./drawer_button";

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

    useEffect(() => {
        const html = document.querySelector("html");
        if (!html) {
            return;
        }
        if (props.open) {
            disableBodyScroll(html);
        } else {
            enableBodyScroll(html);
        }
    }, [props.open]);
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
            /* @ts-expect-error -- This property works but the motion package is not typed properly. */
            className="w-full fixed bottom-0 left-0 right-0 origin-bottom bg-cream text-pine flex flex-col justify-center items-center overflow-y-auto lg:hidden z-10"
        >
            {navButtons.map((b, i) => {
                return (
                    <DrawerButton
                        item={b}
                        key={`drawer-${b.href}`}
                        open={props.open}
                        idx={i}
                    />
                );
            })}
        </motion.div>
    );
});

Drawer.displayName = "Drawer";
