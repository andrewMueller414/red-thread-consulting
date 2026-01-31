import { MdxManagementPage } from "@/features/admin/mdx_management/mdx_management_page/mdx_management_page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const ViewAllMdxPage = async (): Promise<ReactNode> => {

    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/admin");
    }
    return <MdxManagementPage />;
};

ViewAllMdxPage.displayName = "ViewAllMdxPage";

export default ViewAllMdxPage;
