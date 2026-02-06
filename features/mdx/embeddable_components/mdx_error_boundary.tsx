"use client";
import { CheckLineIcon, ShieldAlert } from "lucide-react";
import {
    ErrorBoundary,
    ErrorComponent as ErrorComponentType,
} from "next/dist/client/components/error-boundary";
import React, { type ReactNode } from "react";
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
        return (
            <div className="w-fit py-2 text-red-700 text-center">
                {res[0].message}
            </div>
        );
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
                <ShieldAlert className="text-fog" />
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
