import { NoneFoundView } from "@/core/shared_components/none_found_view";
import { RenderedMdxFormProvider } from "@/features/forms/state/rendered_mdx_form_context";
import { MdxContent } from "@/features/mdx/presentation/mdx_content";
import { trpc } from "@/features/trpc/server";
import React, { type ReactNode } from "react";
import { MdxFormContainer } from "../../../features/mdx/presentation/mdx_form_container";

interface ArticleViewPageProps {
    params: Promise<{
        docId: string;
    }>;
}

const ArticleViewPage = async ({
    params,
}: ArticleViewPageProps): Promise<ReactNode> => {
    const { docId } = await params;
    const mdxSourceId = decodeURI(docId);
    const res = await trpc.mdx.getById({
        id: mdxSourceId,
    });
    if (!res) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">
                <NoneFoundView body="This note could not be found. If you feel like this is an error, please contact the developer." />
            </div>
        );
    }
    return (
        <RenderedMdxFormProvider
            initialValues={{
                mdxSourceId,
                submitting: false,
            }}
        >
            <div className="min-h-screen w-full px-8 lg:px-16 py-16 flex flex-col justify-start items-center">
                <MdxFormContainer>
                    <MdxContent
                        className="w-full mx-auto  max-w-[min(1080px,90vw)] "
                        mdx={res.body}
                        expandLoading
                    />
                </MdxFormContainer>
            </div>
        </RenderedMdxFormProvider>
    );
};

ArticleViewPage.displayName = "ArticleViewPage";

export default ArticleViewPage;
