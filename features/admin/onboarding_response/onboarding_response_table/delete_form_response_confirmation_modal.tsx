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
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete these
                        responses from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

DeleteFormResponseConfirmationModal.displayName =
    "DeleteFormResponseConfirmationModal";
