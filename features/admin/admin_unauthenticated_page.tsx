import React, { type ReactNode } from "react";
import { getProviders } from "next-auth/react";
import { SignInCard } from "./sign_in_card/sign_in_card";

export const AdminUnAuthenticatedPage = async (): Promise<ReactNode> => {
    const providers = await getProviders();
    return (
        <div className="w-full h-fit min-h-screen flex flex-col justify-center items-center px-8 py-12">
            <SignInCard providers={providers} />
        </div>
    );
};

AdminUnAuthenticatedPage.displayName = "AdminUnAuthenticatedPage";
