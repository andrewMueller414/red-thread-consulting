"use client";
import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEventListener } from "@/core/state/hooks/use_event_listener";
import { useRouter } from "next/navigation";
import React, { useState, type ReactNode } from "react";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";

export interface MediaDeleteProps {
    s3Key: string;
}

declare global {
    interface WindowEventMap {
        "show-delete-media-modal": CustomEvent<MediaDeleteProps>;
    }
}

export const MediaDeleteModal = (): ReactNode => {
    const [open, setOpen] = useState<false | MediaDeleteProps>(false);
    useEventListener("show-delete-media-modal", (e) => setOpen(e.detail));
    const router = useRouter();
    const deleteMutation = trpc.admin.deleteImage.useMutation();
    return (
        <AlertDialog
            open={Boolean(open)}
            onOpenChange={(o) => {
                if (!o) {
                    setOpen(false);
                }
            }}
        >
            <AlertDialogContent className="bg-matcha text-fog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-dust">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        image from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-dust hover:bg-dust/80 text-fog hover:text-fog transition-colors duration-300">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={"destructive"}
                        className="bg-red-700 hover:bg-red-800 transition-colors-duration-300"
                        onClick={async () => {
                            if (!open) {
                                return;
                            }
                            deleteMutation.mutate(
                                {
                                    id: open.s3Key,
                                },
                                {
                                    onError: () => {
                                        showNotification({
                                            title: "Oh no...",
                                            message: "This image could not be deleted.",
                                            duration: 5000,
                                            variant: "info",
                                        });
                                    },
                                    onSuccess: () => {
                                        showNotification({
                                            title: "Image deleted",
                                            message: "This image was deleted successfully.",
                                            duration: 5000,
                                            variant: "info",
                                        });
                                        router.refresh();
                                    },
                                },
                            );
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

MediaDeleteModal.displayName = "MediaDeleteModal";
