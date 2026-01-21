import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { LargeHeader } from "@/features/navigation/header";
import { MobileHeader } from "@/features/navigation/mobile_header";
import { GlobalProvider } from "@/core/state/provider";
import { Drawer } from "@/features/navigation/drawer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Red Thread Consulting Onboarding",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <title>Red Thread</title>
            </Head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <GlobalProvider>
                    <LargeHeader />
                    <MobileHeader />
                    {children}
                </GlobalProvider>
            </body>
        </html>
    );
}
