"use client";
import { AppState } from "@/core/state/store";
import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    open: state.nav.showSavedEditorIndicator,
}));

interface EditorSaveIndicatorProps {
    open: boolean;
}

export const EditorSaveIndicator = connector(
    ({ open }: EditorSaveIndicatorProps): ReactNode => {
        if (!open) {
            return null;
        }
        return (
            <motion.div
                /* @ts-expect-error -- This works but the types are wrong. */
                className="top-4 right-4 fixed rounded-full bg-pine text-fog px-3 py-2 text-sm"
            >
                Saved successfully
            </motion.div>
        );
    },
);

EditorSaveIndicator.displayName = "EditorSaveIndicator";
