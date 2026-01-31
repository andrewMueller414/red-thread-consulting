"use client";
import React, { type ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { trpc } from "../../../trpc/trpc_provider";

interface DeleteFormResponseConfirmationModalProps {
    open: boolean;
    close: () => void;
    getSelectedRowIds: () => { id: number }[];
    onSuccess: (ids: { id: number }[]) => void;
    onError?: () => void;
}

export const DeleteFormResponseConfirmationModal = ({
    open,
    close,
    onSuccess,
    getSelectedRowIds,
    onError,
}: DeleteFormResponseConfirmationModalProps): ReactNode => {
    const mutation = trpc.form.deleteById.useMutation();
    const handleDelete = (): void => {
        const ids = getSelectedRowIds();
        mutation.mutate(ids, {
            onSuccess: () => onSuccess(ids),
            onError: onError,
        });
    };
    return (
        <AlertDialog
            open={open}
            onOpenChange={(o) => {
                if (!o) {
                    close();
                }
            }}
        >
            <AlertDialogContent className="bg-matcha text-fog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-dust">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete these
                        responses from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-dust hover:bg-dust/80 text-fog hover:text-fog transition-colors duration-300">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={"destructive"}
                        className="bg-red-700 hover:bg-red-800 transition-colors-duration-300"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

DeleteFormResponseConfirmationModal.displayName =
    "DeleteFormResponseConfirmationModal";
