"use client";
import {
    ErrorBoundary,
    ErrorComponent as ErrorComponentType,
} from "next/dist/client/components/error-boundary";
import React, { useState, type ReactNode } from "react";
import { ZodError } from "zod";

const MessageList = ({ errors }: { errors: string }): ReactNode => {
    let res: null | ZodError[] = null;
    try {
        const _res = JSON.parse(errors) as ZodError[];
        if (_res) {
            res = _res;
        }
    } catch (_) {
        console.log(`Parsing error json failed.`);
    }
    if (!res) {
        return errors;
    }
    if (res.length === 1) {
        return <div className="w-fit py-2 text-red-700">{res[0].message}</div>;
    }
    return (
        <div className="w-full flex flex-col justify-center items-center max-w-100">
            {res.map((e) => {
                return (
                    <div
                        key={`${e.name}-${e.message}`}
                        className="w-full py-2 text-red-700"
                    >
                        {e.message}
                    </div>
                );
            })}
        </div>
    );
};

export const ErrorComponent = ({
    error,
    reset,
}: {
    /* eslint-disable-next-line  -- Need to use any here. */
    error: Error | ZodError<any> | string;
    reset?: () => void;
}): ReactNode => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-2 rounded-full bg-pine stroke-fog">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        opacity: 1,
                    }}
                >
                    <path d="M19.2 14c1.13.836 1.8 1.874 1.8 3c0 2.761-4.03 5-9 5s-9-2.239-9-5c0-1.126.67-2.164 1.8-3" />
                    <path d="M12.759 8c-1.536-.884-2.83-1.214-3.862-1.203m0 0C7.009 6.818 6 7.983 6 9c0 1.657 2.594 3 5.793 3s5.078-1.518 5.793-3c1.448-3-.965-6.5-6.276-7c1.127 1.365 2.221 4.235-2.413 4.797" />
                    <path d="M17.014 10c1.821.721 2.986 1.826 2.986 3.066C20 15.239 16.418 17 12 17s-8-1.761-8-3.934c0-1.107.93-2.107 2.426-2.822" />
                </svg>
            </div>
            <div className="text-2xl font-bellefair">Error</div>
            {typeof error === "string" ? (
                <div className="text-red-700">{error}</div>
            ) : (
                <MessageList
                    errors={
                        error?.message ??
                        "No error message was found. Bug the developer about this."
                    }
                />
            )}
        </div>
    );
};

export const MdxErrorBoundary = ({
    children,
}: {
    children: ReactNode;
}): ReactNode => {
    return (
        <ErrorBoundary errorComponent={ErrorComponent}>{children}</ErrorBoundary>
    );
};

MdxErrorBoundary.displayName = "MdxErrorBoundary";
