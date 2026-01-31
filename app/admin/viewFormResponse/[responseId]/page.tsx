import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { OnboardingResponseViewContainer } from "@/features/admin/onboarding_response/onboarding_response_view/onboarding_response_view_container";
import { ResponseNotFoundView } from "@/features/admin/onboarding_response/onboarding_response_view/response_not_found_view";
import { trpcServer } from "@/features/trpc/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

interface OnboardingResponseByIdPageProps {
    params: Promise<{
        responseId: string;
    }>;
}

const OnboardingResponseByIdPage = async ({
    params,
}: OnboardingResponseByIdPageProps): Promise<ReactNode> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/admin");
    }
    const { responseId } = await params;
    const trpc = await trpcServer();
    const item = await trpc.form.getById({
        id: parseInt(responseId),
    });
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {item ? (
                <OnboardingResponseViewContainer item={item} />
            ) : (
                <ResponseNotFoundView />
            )}
        </div>
    );
};

OnboardingResponseByIdPage.displayName = "OnboardingResponseByIdPage";

export default OnboardingResponseByIdPage;
