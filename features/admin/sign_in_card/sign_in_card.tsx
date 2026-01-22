"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { ClientSafeProvider, type getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import React, { type ReactNode } from "react";
import googleSvg from "@/core/assets/logos/google_logo.svg";
import { Provider } from "react-redux";

interface SignInCardProps {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

const ProviderIcon = ({
    provider,
}: {
    provider: ClientSafeProvider;
}): ReactNode => {
    if (provider.name.toLowerCase() === "google") {
        return <Image src={googleSvg} alt="Google logo" width={24} height={24} />;
    }
    return null;
};

export const SignInCard = ({ providers }: SignInCardProps): ReactNode => {
    if (!providers) {
        return (
            <div>Something went wrong. No authentication providers were found.</div>
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>This is a protected route.</CardDescription>
            </CardHeader>
            <CardContent>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <Button onClick={() => signIn(provider.id)}>
                            <ProviderIcon provider={provider} />
                            Sign in with {provider.name}
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

SignInCard.displayName = "SignInCard";
