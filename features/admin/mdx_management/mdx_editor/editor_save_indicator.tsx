"use client";
import { AppState } from "@/core/state/store";
import React, { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

import { connect, useDispatch } from "react-redux";
import { setEditorSaveSuccessOpen } from "@/features/navigation/state/nav_state_reducer";

const connector = connect((state: AppState) => ({
    open: state.nav.showSavedEditorIndicator,
}));

interface EditorSaveIndicatorProps {
    open: boolean;
}

export const EditorSaveIndicator = connector(
    ({ open }: EditorSaveIndicatorProps): ReactNode => {
        const dispatch = useDispatch();
        useEffect(() => {
            if (open) {
                setTimeout(() => {
                    dispatch(setEditorSaveSuccessOpen(false));
                }, 2000);
            }
        }, [open]);
        if (!open) {
            return null;
        }
        return (
            <motion.div
                /* @ts-expect-error -- This works but the types are wrong. */
                className="top-4 right-4 fixed rounded-full bg-pine text-fog px-3 py-2 text-sm z-999"
                initial={"initial"}
                animate={"show"}
                variants={{
                    initial: {
                        opacity: 0,
                        scale: 0,
                    },
                    show: {
                        opacity: 1,
                        scale: 1,
                    },
                }}
            >
                Saved successfully
            </motion.div>
        );
    },
);

EditorSaveIndicator.displayName = "EditorSaveIndicator";
