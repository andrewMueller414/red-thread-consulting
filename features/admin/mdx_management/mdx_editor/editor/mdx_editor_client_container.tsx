"use client";
import React, { type ReactNode } from "react";
import { MdxEditorProps } from "./mdx_editor";
import dynamic from "next/dynamic";
const MdxEditor = dynamic(
    () => import("./mdx_editor").then((a) => a.MdxEditor),
    {
        ssr: false,
    },
);

export const MdxEditorClientContainer = (props: MdxEditorProps): ReactNode => {
    return <MdxEditor {...props} />;
};

MdxEditorClientContainer.displayName = "MdxEditorClientContainer";
