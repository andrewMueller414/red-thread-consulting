"use client";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Cross as Hamburger } from "hamburger-react";

import { connect, useDispatch } from "react-redux";
import { AppState } from "@/core/state/store";
import { setDrawerOpen } from "./state/nav_state_reducer";
import { Drawer } from "./drawer";
import Image from "next/image";

const connector = connect((state: AppState) => ({
    open: state.nav.drawer.open,
}));

export const MobileHeader = connector(
    ({ open }: { open: boolean }): ReactNode => {
        const dispatch = useDispatch();
        const container = useRef<HTMLDivElement>(null!);
        const [height, setHeight] = useState(0);
        const getHeight = (): void => {
            setHeight(container.current.getBoundingClientRect().height);
        };
        useEffect(() => {
            getHeight();
            window.addEventListener("resize", getHeight);
            return () => window.removeEventListener("resize", getHeight);
        }, []);
        return (
            <>
                <div
                    className="lg:hidden flex flex-row justify-between items-center gap-x-8 px-8 py-4 min-[450px]:px-12 min-[450px]:py-6"
                    ref={container}
                >
                    <a
                        className="w-fit flex flex-col justify-center items-center"
                        href="https://www.redthreadconsulting.co"
                    >
                        <Image
                            src="/logo/text_logo.svg"
                            width={200}
                            height={120}
                            alt="Red Thread Consulting Logo"
                        />
                    </a>
                    <Hamburger
                        toggled={open}
                        onToggle={(val) => dispatch(setDrawerOpen(val))}
                    />
                </div>
                <Drawer navbarHeight={height} />
            </>
        );
    },
);

MobileHeader.displayName = "MobileHeader";
