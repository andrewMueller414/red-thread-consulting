import type { ListObjectsOutput } from "@aws-sdk/client-s3";
import React, { type ReactNode } from "react";
import { MediaGalleryImage } from "./media_gallery_image";

interface MediaManagementGalleryProps {
    items: NonNullable<ListObjectsOutput["Contents"]>;
}

export const MediaManagementGallery = ({
    items,
}: MediaManagementGalleryProps): ReactNode => {
    return (
        <div className="w-full max-w-270 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => {
                return <MediaGalleryImage key={item.Key} item={item} />;
            })}
        </div>
    );
};

MediaManagementGallery.displayName = "MediaManagementGallery";
