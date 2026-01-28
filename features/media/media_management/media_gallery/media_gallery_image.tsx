"use client";
import { ListObjectsOutput } from "@aws-sdk/client-s3";
import React, { type ReactNode } from "react";
import { imageIdToUrl } from "../../data/media_utils";
import { XIcon } from "lucide-react";

interface MediaGalleryImageProps {
    item: NonNullable<ListObjectsOutput["Contents"]>[number];
}

export const MediaGalleryImage = ({
    item,
}: MediaGalleryImageProps): ReactNode => {
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
        <div className="w-full h-full relative">
            <img
                src={imageIdToUrl(item.Key)}
                alt="Red Thread Consulting media image."
                className="w-full h-full object-cover cursor-pointer"
                onClick={viewImageDetails}
            />
            <XIcon
                className="absolute top-3 left-3 w-3 h-3 text-fog cursor-pointer bg-dust/50 rounded hover:bg-red-700 transition-colors duration-300"
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
        </div>
    );
};

MediaGalleryImage.displayName = "MediaGalleryImage";
