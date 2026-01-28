"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, type ReactNode } from "react";
import { uploadImage } from "../data/get_aws";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
import { fileToZodObject } from "../data/zod_file_object";

const ACCEPTED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const ImageFileInput = (): ReactNode => {
    const useImageUpload = trpc.admin.uploadImage.useMutation();
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const handleUpload = async (): Promise<void> => {
        if (!file) {
            return;
        }
        const fileData = await fileToZodObject(file);
        useImageUpload.mutate(
            {
                file: fileData,
                id: v4(),
            },
            {
                onError: () => {
                    showNotification({
                        title: "Something went wrong",
                        message: "This image could not be uploaded",
                        variant: "info",
                        duration: 5000,
                    });
                },
                onSuccess: () => {
                    showNotification({
                        title: "Image uploaded",
                        message: "Your image was uploaded successfully.",
                        variant: "info",
                        duration: 5000,
                    });
                    router.refresh();
                },
            },
        );
    };

    return (
        <div className="flex flex-row justify-center items-center gap-x-4 w-fit">
            <Input
                type="file"
                className="border-fog/20 bg-fog text-pine"
                accept={ACCEPTED_FILE_TYPES.join(",")}
                onChange={(event) => {
                    // Manually handle the onChange event to capture the File object
                    setFile(event.target.files?.[0] ?? null);
                }}
            />
            <Button
                className="bg-fog text-pine hover:bg-fog/80 hover:text-pine"
                onClick={handleUpload}
            >
                Upload
            </Button>
        </div>
    );
};

ImageFileInput.displayName = "ImageFileInput";
