import React, { type ReactNode } from "react";

export const FooterContainer = (): ReactNode => {
    return (
        <div className="w-full min-h-52 flex flex-col justify-center items-center">
            <div>Footer will go here</div>
        </div>
    );
};

FooterContainer.displayName = "FooterContainer";
