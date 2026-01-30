import React, { type ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { MdxContent } from "../../features/mdx/presentation/mdx_content";
import { trpc } from "../../features/trpc/server";

const DocsPage = async (): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/admin");
    }
    const docItem = await trpc.mdx.getDocByFilePath("embeddable_components.mdx");
    if (!docItem) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center px-8 py-12">
                <div>No doc entry found</div>
            </div>
        );
    }
    return (
        <div className="px-8 py-16 flex flex-col justify-start items-center">
            <div className="max-w-270 w-full prose">
                <MdxContent mdx={docItem} />
            </div>
        </div>
    );
};

DocsPage.displayName = "DocsPage";

export default DocsPage;
