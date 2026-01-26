"use client";
import React, { type ReactNode } from "react";
import { MdxPreviewProps } from "./mdx_preview";
import dynamic from "next/dynamic";
const MdxPreview = dynamic(
    () => import("./mdx_preview").then((a) => a.MdxPreview),
    {
        ssr: false,
    },
);

export const MdxPreviewClientContainer = (
    props: MdxPreviewProps,
): ReactNode => {
    return <MdxPreview {...props} />;
};

MdxPreviewClientContainer.displayName = "MdxPreviewClientContainer";
