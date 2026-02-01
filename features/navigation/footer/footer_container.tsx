import React, { type ReactNode } from "react";
import { FooterBottomBar } from "./footer_bottom_bar";
import Image from "next/image";
import { FooterItem } from "../navigation_types";
import { FooterColumn } from "./footer_column";

export const FooterContainer = (): ReactNode => {
    const footerMap: Record<string, FooterItem[]> = {
        Info: [
            {
                label: "Our story",
                href: "https://www.redthreadconsulting.co/our-story",
            },
            {
                label: "Social Impace",
                href: "https://www.redthreadconsulting.co/social-impact",
            },
        ],
        Offerings: [
            {
                label: "Our story",
                href: "https://www.redthreadconsulting.co/our-story",
            },
            {
                label: "Social Impace",
                href: "https://www.redthreadconsulting.co/social-impact",
            },
        ],
        Connect: [
            {
                label: "Our story",
                href: "https://www.redthreadconsulting.co/our-story",
            },
            {
                label: "Social Impace",
                href: "https://www.redthreadconsulting.co/social-impact",
            },
        ],
    };
    return (
        <div
            className="w-full min-h-52 flex flex-col justify-center items-center"
            id="footer-container"
        >
            <div className="w-full max-w-270 flex flex-col lg:flex-row lg:justify-center lg:items-center px-8 py-6">
                <Image
                    src="/logo/connection_advocacy_logo.svg"
                    width={350}
                    height={160}
                    alt="Connect & Advocacy"
                    className="max-h-40 place-self-center max-lg:max-w-37.5"
                />
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-8">
                    {Object.keys(footerMap).map((k) => {
                        return (
                            <FooterColumn
                                label={k.toUpperCase()}
                                items={footerMap[k]}
                                key={`footer-col-${k}`}
                            />
                        );
                    })}
                </div>
            </div>
            <FooterBottomBar />
        </div>
    );
};

FooterContainer.displayName = "FooterContainer";
