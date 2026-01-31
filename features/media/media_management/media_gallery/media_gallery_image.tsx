"use client";
import { ListObjectsOutput } from "@aws-sdk/client-s3";
import React, { useState, type ReactNode } from "react";
import { imageIdToUrl } from "../../data/media_utils";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../../lib/utils";

interface MediaGalleryImageProps {
    item: NonNullable<ListObjectsOutput["Contents"]>[number];
}

export const MediaGalleryImage = ({
    item,
}: MediaGalleryImageProps): ReactNode => {
    const [hover, setHover] = useState(false);
    if (!item.Key) {
        console.error("Encountered an image without a Key. Cannot render.");
        return null;
    }

    const viewImageDetails = (): void => {
        window.dispatchEvent(
            new CustomEvent("show-image-details", {
                detail: item,
            }),
        );
    };

    return (
        <div
            className="w-full h-full relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={imageIdToUrl(item.Key)}
                alt="Red Thread Consulting media image."
                className="w-full h-full object-cover cursor-pointer"
                onClick={viewImageDetails}
            />
            <XIcon
                className={cn(
                    "absolute top-3 left-3 w-3 h-3 text-fog cursor-pointer rounded transition-colors duration-300 z-10 origin-bottom-right delay-75",
                    hover ? "bg-red-700" : "bg-dust/50",
                )}
                onClick={() => {
                    window.dispatchEvent(
                        new CustomEvent("show-delete-media-modal", {
                            detail: {
                                s3Key: item.Key,
                            },
                        }),
                    );
                }}
            />
            <motion.div
                /* @ts-expect-error -- Type error on framer-motion's end. */
                className="bg-dust absolute top-0 left-0 right-0 bottom-0 h-full w-full cursor-pointer"
                animate={hover ? "hover" : "notHover"}
                initial={"notHover"}
                variants={{
                    hover: {
                        scale: 1,
                        opacity: 0.3,
                    },
                    notHover: {
                        opacity: 0,
                        scale: 0,
                    },
                }}
                transition={{
                    bounce: 0,
                }}
                onClick={viewImageDetails}
            />
        </div>
    );
};

MediaGalleryImage.displayName = "MediaGalleryImage";
