"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppState } from "@/core/state/store";
import { setEditorMdxIdModalOpen } from "@/features/navigation/state/nav_state_reducer";
import { useState } from "react";

import { connect, useDispatch } from "react-redux";
import {
    useMdxEditorContext,
    useMdxEditorDispatch,
} from "./mdx_editor/state/mdx_editor_context";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";

const connector = connect((state: AppState) => ({
    open: state.nav.mdxIdModalOpen,
}));

export const MdxIdSelectModal = connector(({ open }: { open: boolean }) => {
    const dispatch = useDispatch();
    const mdxMutation = trpc.mdx.save.useMutation();
    const localDispatch = useMdxEditorDispatch();
    const { value } = useMdxEditorContext();
    const [inputValue, setInputValue] = useState("");
    const handleSave = async (): Promise<void> => {
        if (!inputValue.length) {
            return;
        }
        localDispatch({
            type: "setMdxContentId",
            payload: inputValue,
        });
        if (value.length) {
            mdxMutation.mutate(
                {
                    id: inputValue,
                    body: value,
                },
                {
                    onSuccess: () => {
                        showNotification({
                            title: "Note saved successfully.",
                            variant: "info",
                            duration: 5000,
                            message: "Saved.",
                        });
                        dispatch(setEditorMdxIdModalOpen(false));
                    },
                    onError: (err) => {
                        console.error("err: ", err);
                    },
                },
            );
        }
    };
    return (
        <Dialog
            open={open}
            onOpenChange={(o) => {
                if (!o) {
                    dispatch(setEditorMdxIdModalOpen(false));
                }
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Give this article a unique id</DialogTitle>
                    <DialogDescription>
                        This id can be any value, but it must be unique and it is not
                        changeable. This will be associated with this note in the database
                        and will be shown to admins with the user&apos;s response, so it
                        should be descriptive.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Id
                        </Label>
                        <Input
                            id="link"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Onboarding - Spring 2026"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});
