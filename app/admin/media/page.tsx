import { NoneFoundView } from "@/core/shared_components/none_found_view";
import { listImageObjects } from "@/features/media/data/get_aws";
import { MediaDeleteModal } from "@/features/media/media_management/media_delete_modal";
import { MediaManagementGallery } from "@/features/media/media_management/media_gallery/media_management_gallery";
import { MediaImageDetailModal } from "@/features/media/media_management/media_image_detail_modal";
import { MediaManagementHeader } from "@/features/media/media_management/media_management_header";
import React, { type ReactNode } from "react";

const MediaManagementPage = async (): Promise<ReactNode> => {
    const imageData = await listImageObjects();
    return (
        <div className="w-full h-fit min-h-screen flex flex-col justify-start items-center gap-y-6 pt-12 pb-16 px-8">
            <MediaManagementHeader count={imageData.Contents?.length ?? 0} />
            {imageData.Contents?.length ? (
                <MediaManagementGallery items={imageData.Contents} />
            ) : (
                <NoneFoundView body="No images were found. Click above to begin uploading. If you feel that this is an error please contact the developer." />
            )}
            <MediaImageDetailModal />
            <MediaDeleteModal />
        </div>
    );
};

MediaManagementPage.displayName = "MediaManagementPage";

export default MediaManagementPage;
