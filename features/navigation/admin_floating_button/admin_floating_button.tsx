"use client";
import { LiquidGlassCard } from "@/core/shared_components/apple_liquid_glass";
import { IconSearch } from "@tabler/icons-react";
import React, { useState, type ReactNode } from "react";
import { AdminFloatingButtonList } from "./admin_floating_button_item_list";

export const AdminFloatingButton = (): ReactNode => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {open ? <AdminFloatingButtonList close={() => setOpen(false)} /> : null}
            <LiquidGlassCard
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="12px"
                blurIntensity="lg"
                draggable={false}
                className="rounded-[100%] p-4 fixed bottom-4 right-4 h-12 w-12"
                onClick={() => setOpen(!open)}
            >
                <IconSearch className="text-dust absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            </LiquidGlassCard>
        </>
    );
};

AdminFloatingButton.displayName = "AdminFloatingButton";
