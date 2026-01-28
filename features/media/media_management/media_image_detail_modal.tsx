"use client";
import { ListObjectsOutput } from "@aws-sdk/client-s3";
import React, { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useEventListener } from "@/core/state/hooks/use_event_listener";
import { imageIdToUrl } from "../data/media_utils";
import { Copy, Search } from "lucide-react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group";
import { showNotification } from "@/features/notifications/notification_utils";

declare global {
    interface WindowEventMap {
        "show-image-details": CustomEvent<
            NonNullable<ListObjectsOutput["Contents"]>[number]
        >;
    }
}

export const MediaImageDetailModal = (): ReactNode => {
    const [open, setOpen] = useState<
        false | NonNullable<ListObjectsOutput["Contents"]>[number]
    >(false);

    useEventListener("show-image-details", (e) => setOpen(e.detail));

    if (!open || !open.Key) {
        return null;
    }

    const url = imageIdToUrl(open.Key);

    return (
        <motion.div
            /* @ts-expect-error -- Type error on framer-motion's end. */
            className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-pine/60"
            animate={open ? "show" : "hide"}
            initial="hide"
            variants={{
                show: {
                    opacity: 1,
                },
                hide: {
                    opacity: 0,
                },
            }}
            onClick={() => setOpen(false)}
        >
            <motion.div
                /* @ts-expect-error -- Type error on framer-motion's end. */
                className="bg-pine text-fog px-4 py-3 rounded"
                onClick={(e: Event) => {
                    e.stopPropagation();
                }}
                variants={{
                    show: {
                        scale: 1,
                        opacity: 1,
                    },
                    hide: {
                        scale: 0,
                        opacity: 0,
                    },
                }}
            >
                <img
                    src={url}
                    alt="Red Thread Consulting media image."
                    className="w-full h-full object-contain max-h-[min(600px,calc(100vh-8rem))] max-w-[90vw] rounded"
                />
                <InputGroup
                    className="mt-4 min-w-full"
                    onClick={async () => {
                        await window.navigator.clipboard.writeText(url);
                        showNotification({
                            duration: 5000,
                            message: "This url was copied to your clipboard",
                            title: "Success",
                            variant: "info",
                        });
                    }}
                >
                    <InputGroupInput readOnly value={url} />
                    <InputGroupAddon>
                        <Copy className="text-fog" />
                    </InputGroupAddon>
                </InputGroup>
            </motion.div>
        </motion.div>
    );
};

MediaImageDetailModal.displayName = "MediaImageDetailModal";
