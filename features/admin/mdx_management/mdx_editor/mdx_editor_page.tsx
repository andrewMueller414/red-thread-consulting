import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MdxContent } from "@/lib/generated/prisma/browser";
import React, { type ReactNode } from "react";
import { MdxEditorClientContainer } from "./editor/mdx_editor_client_container";
import { MdxPreviewClientContainer } from "./mdx_preview_client_container";

interface MdxEditorPageProps {
    editingItem: MdxContent | null;
}

export const MdxEditorPageComponent = async ({
    editingItem,
}: MdxEditorPageProps): Promise<ReactNode> => {
    return (
        <ResizablePanelGroup dir="horizontal" className="h-screen min-h-screen">
            <ResizablePanel className="w-full">
                <MdxEditorClientContainer initialValue={editingItem?.body ?? ""} />
            </ResizablePanel>
            <ResizableHandle className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-pine/40 focus-visible:bg-pine transition-colors duration-150" />
            <ResizablePanel>
                <MdxPreviewClientContainer />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

MdxEditorPageComponent.displayName = "MdxEditorPageComponent";
