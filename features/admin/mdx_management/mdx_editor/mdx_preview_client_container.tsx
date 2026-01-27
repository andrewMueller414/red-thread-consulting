"use client";
import React, { type ReactNode } from "react";
import dynamic from "next/dynamic";
const MdxPreview = dynamic(
    () => import("./mdx_preview").then((a) => a.MdxPreview),
    {
        ssr: false,
    },
);

export const MdxPreviewClientContainer = (): ReactNode => {
    return <MdxPreview />;
};

MdxPreviewClientContainer.displayName = "MdxPreviewClientContainer";
