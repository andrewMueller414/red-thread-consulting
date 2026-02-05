import React, { type ReactNode } from "react";
import {
    EmbeddabledTitleProps,
    titlePropsSchema,
} from "../../data/schemas/input_props_schemas";
import {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
} from "../../../../core/shared_components/typography";
import { cn } from "../../../../lib/utils";
import { themeColorForegroundRecordToString } from "../shared_schemas";
import { getSizePropsString, sizePropsObject } from "../media/image";

const TitleSwitch = ({
    depth,
    title,
    ...props
}: Pick<EmbeddabledTitleProps, "depth" | "title" | "font"> & {
    className?: string;
}): ReactNode => {
    switch (depth) {
        case 1:
            return <H1 {...props}>{title}</H1>;
        case 2:
            return <H2 {...props}>{title}</H2>;
        case 3:
            return <H3 {...props}>{title}</H3>;
        case 4:
            return <H4 {...props}>{title}</H4>;
        case 5:
            return <H5 {...props}>{title}</H5>;
        case 6:
            return <H6 {...props}>{title}</H6>;
    }
};

export const EmbeddabledTitle = (props: EmbeddabledTitleProps): ReactNode => {
    const { title, subtitle, depth, font, width, colorClasses, sizeClasses } =
        titlePropsSchema
            .merge(sizePropsObject)
            .transform((c) => {
                return {
                    ...c,
                    colorClasses: themeColorForegroundRecordToString(c),
                    sizeClasses: getSizePropsString(c),
                };
            })
            .parse(props);
    return (
        <div
            className={cn(
                "w-fit flex flex-col justify-start items-start",
                width,
                colorClasses,
                sizeClasses,
            )}
        >
            <TitleSwitch className="mb-0!" depth={depth} title={title} font={font} />
            <div className="text-[12px] font-mono text-pine">{subtitle}</div>
        </div>
    );
};

EmbeddabledTitle.displayName = "EmbeddabledTitle";
