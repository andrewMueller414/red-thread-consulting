"use client";
import React, {
    useEffect,
    useEffectEvent,
    useState,
    type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";

export const SaveEditorNotification = (): ReactNode => {
    const localStorageKey = "showEditorSaveNotification";
    const [show, setShow] = useState<boolean>(false);

    const handleShow = useEffectEvent((newShow: boolean) => setShow(newShow));

    useEffect(() => {
        const hasShown = window.localStorage.getItem(localStorageKey) === "true";
        if (hasShown) {
            handleShow(false);
        } else {
            handleShow(true);
        }
    }, []);

    if (!show) {
        return null;
    }

    return (
        <motion.div
            /* @ts-expect-error -- Type error on framer-motion's end. */
            className="w-[min(90vw,450px)] h-fit grid grid-cols-[1fr_80px] rounded-lg fixed bottom-4 left-4 place-items-center gap-x-4 bg-pine text-fog px-3 py-2 z-99"
            initial={"hide"}
            animate="show"
            variants={{
                show: {
                    left: 16,
                },
                hide: {
                    left: -500,
                },
            }}
        >
            <div>
                <div className="font-bold font-bellefair">
                    Important note on the editor
                </div>
                <div>
                    You <span className="font-extrabold">must</span> use ⌥.+s to save the
                    editor&apos;s content. This will write the content to the database, so
                    it was not implemented automatically to keep operational costs down.
                </div>
            </div>
            <Button
                className=""
                onClick={() => {
                    window.localStorage.setItem(localStorageKey, "true");
                    setShow(false);
                }}
            >
                Confirm
            </Button>
        </motion.div>
    );
};

SaveEditorNotification.displayName = "SaveEditorNotification";
