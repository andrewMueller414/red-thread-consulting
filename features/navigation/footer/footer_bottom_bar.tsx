import React, { type ReactNode } from "react";

export const FooterBottomBar = (): ReactNode => {
    return (
        <div className="w-full h-fit bg-mist text-cream flex flex-col justify-center items-center px-8 py-3">
            <div className="max-w-270 text-sm">
                <span>
                    <span className="text-[12px] font-mono text-fog">© </span>
                    {`RED THREAD CONSULTING, ${new Date().getFullYear()}`}
                </span>
            </div>
        </div>
    );
};

FooterBottomBar.displayName = "FooterBottomBar";
