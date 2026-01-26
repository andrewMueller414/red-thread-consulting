import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MdxContent } from "@/lib/generated/prisma/browser";
import React, { type ReactNode } from "react";
import { trpc } from "@/features/trpc/server";
import { MdxEditorClientContainer } from "./editor/mdx_editor_client_container";
import { MdxPreviewClientContainer } from "./mdx_preview_client_container";

interface MdxEditorPageProps {
    editingItem: MdxContent | null;
}

export const MdxEditorPageComponent = async ({
    editingItem,
}: MdxEditorPageProps): Promise<ReactNode> => {
    const initialParsedContent = editingItem
        ? await trpc.mdx.parseMdxContent(editingItem.body)
        : "";
    return (
        <ResizablePanelGroup dir="horizontal" className="h-screen min-h-screen">
            <ResizablePanel>
                <MdxEditorClientContainer initialValue={editingItem?.body ?? ""} />
            </ResizablePanel>
            <ResizableHandle className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-pine/40 focus-visible:bg-pine transition-colors duration-150" />
            <ResizablePanel>
                <MdxPreviewClientContainer
                    initialParsedContent={initialParsedContent}
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

MdxEditorPageComponent.displayName = "MdxEditorPageComponent";
