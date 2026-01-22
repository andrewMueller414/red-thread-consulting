"use client";
import { AppState } from "@/core/state/store";
import React, { useCallback, useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "./state/nav_state_reducer";

export const NavigationResizeObserver = (): ReactNode => {
    const dispatch = useDispatch();
    const drawerOpen = useSelector((state: AppState) => state.nav.drawer.open);
    const handleResize = useCallback(() => {
        if (window.innerWidth >= 1024 && drawerOpen) {
            dispatch(setDrawerOpen(false));
        }
    }, [drawerOpen, dispatch]);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);
    return null;
};

NavigationResizeObserver.displayName = "NavigationResizeObserver";
