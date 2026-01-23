import React, { type ReactNode } from "react";

export const ResponseNotFoundView = (): ReactNode => {
    return (
        <div className="max-w-87.5 flex flex-col justify-center items-center">
            <div className="text-3xl font-bellefair">Oh no</div>
            <div className="text-center">
                This entry could not be found. If this continues, please reach out and
                I&apos;ll fix it.
            </div>
        </div>
    );
};

ResponseNotFoundView.displayName = "ResponseNotFoundView";
