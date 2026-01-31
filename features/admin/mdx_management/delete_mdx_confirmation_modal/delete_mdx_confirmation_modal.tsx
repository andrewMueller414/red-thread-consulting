"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEventListener } from "@/core/state/hooks/use_event_listener";
import React, { useState, type ReactNode } from "react";
import { DeleteMdxConfirmationModalState } from "./delete_mdx_confirmation_modal_actions";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";

declare global {
    interface WindowEventMap {
        "show-delete-mdx-confirmation": CustomEvent<DeleteMdxConfirmationModalState>;
        "delete-mdx-success": CustomEvent<
            Pick<DeleteMdxConfirmationModalState, "ids">
        >;
    }
}

export const DeleteMdxConfirmationModal = (): ReactNode => {
    const deleteMutation = trpc.mdx.deleteByIds.useMutation();
    const [open, setOpen] = useState<false | DeleteMdxConfirmationModalState>(
        false,
    );
    useEventListener("show-delete-mdx-confirmation", (e) => {
        setOpen(e.detail);
    });
    return (
        <AlertDialog
            open={Boolean(open)}
            onOpenChange={(o) => {
                if (!o) {
                    setOpen(false);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete these
                        articles from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-matcha hover:bg-matcha/80 transition-colors duration-300">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={"destructive"}
                        onClick={async () => {
                            if (!open) {
                                return;
                            }
                            deleteMutation.mutate(open.ids, {
                                onError: (err) =>
                                    showNotification({
                                        duration: 5000,
                                        message: "Could not delete the requested markdown content",
                                        title: "Oh no...",
                                        variant: "info",
                                    }),
                                onSuccess: () => {
                                    window.dispatchEvent(
                                        new CustomEvent("delete-mdx-success", {
                                            detail: {
                                                ids: open.ids,
                                            },
                                        }),
                                    );
                                },
                            });
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

DeleteMdxConfirmationModal.displayName = "DeleteMdxConfirmationModal";
