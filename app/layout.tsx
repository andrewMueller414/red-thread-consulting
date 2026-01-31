import type { Metadata } from "next";
import { Bellefair, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { LargeHeader } from "@/features/navigation/header";
import { MobileHeader } from "@/features/navigation/mobile_header";
import { GlobalProvider } from "@/core/state/provider";
import { FooterContainer } from "@/features/navigation/footer/footer_container";
import { NavigationResizeObserver } from "@/features/navigation/navigation_resize_observer";
import { NotificationsContainer } from "@/features/notifications/presentation/notifications_container";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AdminFloatingButton } from "@/features/navigation/admin_floating_button/admin_floating_button";
import { TRPCProvider } from "@/features/trpc/trpc_provider";

const bellefair = Bellefair({
    variable: "--font-bellefair",
    weight: ["400"],
    subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["400"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Red Thread Consulting Onboarding",
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <Head>
                <title>Red Thread</title>
                <link
                    rel="icon"
                    href="/logo/favicon.svg"
                    type="image/svg+xml"
                    sizes="any"
                />
            </Head>
            <body
                className={`${bellefair.variable} ${plexMono.variable} antialiased font-sans`}
            >
                <GlobalProvider>
                    <TRPCProvider>
                        <NotificationsContainer />
                        <LargeHeader />
                        <MobileHeader />
                        <NavigationResizeObserver />
                        {children}
                        <FooterContainer />
                        {session ? (
                            <>
                                <AdminFloatingButton />
                            </>
                        ) : null}
                    </TRPCProvider>
                </GlobalProvider>
            </body>
        </html>
    );
};

export default RootLayout;
