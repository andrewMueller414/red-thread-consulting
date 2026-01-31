"use client";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MdxContent } from "@/lib/generated/prisma/browser";
import React, { type ReactNode } from "react";
import { MdxEditorClientContainer } from "./editor/mdx_editor_client_container";
import { MdxPreviewClientContainer } from "./mdx_preview_client_container";
import { MdxEditorProvider } from "./state/mdx_editor_context";
import { EditorSaveIndicator } from "./editor_save_indicator";
import { MdxIdSelectModal } from "../mdx_id_select_modal";

interface MdxEditorPageProps {
    editingItem: MdxContent | null;
}

export const MdxEditorPageComponent = ({
    editingItem,
}: MdxEditorPageProps): ReactNode => {
    return (
        <MdxEditorProvider
            initialValues={{
                value: editingItem ? editingItem.body : "",
                mdxContentId: editingItem?.id ?? null,
                formFieldNames: [],
            }}
        >
            <EditorSaveIndicator />
            <MdxIdSelectModal />
            <ResizablePanelGroup dir="horizontal" className="h-screen">
                <ResizablePanel className="w-full">
                    <MdxEditorClientContainer initialValue={editingItem?.body ?? ""} />
                </ResizablePanel>
                <ResizableHandle className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-pine/40 focus-visible:bg-pine transition-colors duration-150" />
                <ResizablePanel>
                    <div className="overflow-y-auto max-h-screen min-h-0">
                        <MdxPreviewClientContainer />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </MdxEditorProvider>
    );
};

MdxEditorPageComponent.displayName = "MdxEditorPageComponent";
