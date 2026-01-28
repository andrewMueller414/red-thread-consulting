import React, { type ReactNode } from "react";
import { ImageFileInput } from "./image_file_input";

export const MediaManagementHeader = ({
    count,
}: {
    count: number;
}): ReactNode => {
    return (
        <div className="w-full max-w-270 bg-moss text-fog px-4 py-3 rounded flex flex-row justify-between items-center">
            <div className="w-fit h-full flex flex-col justify-start items-center">
                <div className="text-sm">{`${count} total image${count > 1 ? "s" : ""}`}</div>
            </div>
            <div>
                <div className="text-lg">Upload</div>
                <ImageFileInput />
            </div>
        </div>
    );
};

MediaManagementHeader.displayName = "MediaManagementHeader";
