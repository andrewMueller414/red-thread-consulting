import React, { type ReactNode } from "react";
import { FooterItem } from "../navigation_types";

interface FooterColumnProps {
    label: string;
    items: FooterItem[];
}

export const FooterColumn = (props: FooterColumnProps): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-start items-center lg:items-start mt-6 lg:mt-0 font-mono">
            <div className="tracking-wide text-[14px]">{props.label}</div>
            <div className="w-full h-px bg-pine mt-3 mb-6 max-w-87.5" />
            {props.items.map((item) => {
                return (
                    <a
                        className="text-sm mb-4 hover:text-pine/90 transition-colors duration-200"
                        key={`footer-item-${item.href}`}
                        href={item.href}
                    >
                        {item.label.toUpperCase()}
                    </a>
                );
            })}
        </div>
    );
};

FooterColumn.displayName = "FooterColumn";
