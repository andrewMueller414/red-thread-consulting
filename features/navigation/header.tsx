import Image from "next/image";
import React, { type ReactNode } from "react";

interface HeaderButton {
    href: string;
    label: ReactNode;
}

export const navButtons: HeaderButton[] = [
    {
        href: "https://www.redthreadconsulting.co/our-story",
        label: "OUR STORY",
    },
    {
        href: "https://www.redthreadconsulting.co/the-12x12-journey",
        label: <div>THE 12x12 JOURNEY™</div>,
    },
    {
        href: "https://www.redthreadconsulting.co/offerings",
        label: "OFFERINGS",
    },
    {
        href: "https://www.redthreadconsulting.co/social-impact",
        label: "SOCIAL IMPACT",
    },
    {
        href: "https://www.redthreadconsulting.co/speaking-and-media",
        label: "SPEAKING & MEDIA",
    },
    {
        href: "https://www.redthreadconsulting.co/contact",
        label: "CONTACT",
    },
];

export const LargeHeader = (): ReactNode => {
    return (
        <div className="w-screen top-0 left-0 right-0 flex flex-col justify-center items-center max-lg:hidden">
            <a
                className="w-fit flex flex-col justify-center items-center py-4 capitalize"
                href="https://www.redthreadconsulting.co"
            >
                <Image
                    width={350}
                    height={200}
                    alt="Red Thread Consulting logo"
                    src={"/logo/text_logo.svg"}
                />
            </a>
            <div
                className="w-full grid"
                style={{
                    gridTemplateColumns: `repeat(${navButtons.length}, 1fr)`,
                }}
            >
                {navButtons.map((b) => {
                    return (
                        <a
                            key={b.href}
                            href={b.href}
                            className="w-full h-full flex flex-col justify-center items-center border hover:bg-hover transition-colors duration-150 text-[14px] py-2"
                        >
                            {b.label}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

LargeHeader.displayName = "LargeHeader";
