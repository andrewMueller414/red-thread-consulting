"use client";
import React, { type ReactNode } from "react";
import { useParsedMdx } from "../state/hooks/use_parsed_mdx";

interface MdxParsedContentProps {
    parsedContent: string;
}

export const MdxParsedContent = ({
    parsedContent,
}: MdxParsedContentProps): ReactNode => {
    const Component = useParsedMdx(parsedContent);
    if (Component === null) {
        return null;
    } else {
        /* eslint-disable-next-line  -- Need to create component during render... that's kind of mdx's thing. */
        return <Component />;
    }
};

MdxParsedContent.displayName = "MdxParsedContent";
