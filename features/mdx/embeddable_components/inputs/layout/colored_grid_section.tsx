import React, { type ReactNode } from "react";
import { z } from "zod";
import { getSizePropsString, sizePropsObject } from "../../media/image";
import {
    colorEnumRecord,
    firstThemeColorValue,
    ThemeColor,
    themeColorBackgroundRecordToString,
} from "../../shared_schemas";
import { cn } from "../../../../../lib/utils";
import Image from "next/image";
import { getFontClassSchema } from "../../../data/schemas/input_props_schemas";

const colorGridSectionProps = sizePropsObject
    .merge(colorEnumRecord)
    .extend({
        img: z.string({
            message:
                "This layout requries an 'img' property that is a url pointing to the image.",
        }),
        titleFont: getFontClassSchema("ss-pro"),
        reverse: z.boolean().optional(),
        imgAlt: z.string({
            message:
                "This layout requires an 'imgAlt' property that is some descriptive string for the image.",
        }),
        title: z.string({ message: "Please provide a title property." }),
        subtitle: z.string().optional(),
    })
    .transform((c) => {
        return {
            ...c,
            sizeClasses: getSizePropsString(c),
            colorClasses: themeColorBackgroundRecordToString(c),
            color: firstThemeColorValue(c) ?? "moss",
        };
    });

export type ColoredGridSectionProps = z.infer<typeof colorGridSectionProps> & {
    children: ReactNode;
};

const MainContainer = ({
    children,
    reverse,
    className,
}: {
    children: ReactNode;
    reverse: boolean;
    className: string;
}): ReactNode => {
    return (
        <div
            className={cn(
                "group not-prose flex @5xl/mdx:grid @5xl/mdx:grid-cols-2 rounded",
                className,
                reverse ? "flex-col" : "flex-col-reverse",
            )}
        >
            {children}
        </div>
    );
};

const Title = ({
    children,
    color,
    font,
}: {
    children: string;
    color?: ThemeColor;
    font?: string;
}): ReactNode => {
    const colorClasses: { [K in ThemeColor]: string } = {
        dust: "text-fog",
        mist: "text-fog",
        moss: "text-fog",
        pine: "text-fog",
        cream: "text-dust",
        fog: "text-dust",
        matcha: "text-dust",
    };
    return (
        <h2
            className={cn(
                "text-3xl @5xl/mdx:text-4xl mb-0",
                color && colorClasses[color],
                font,
            )}
        >
            {children}
        </h2>
    );
};

const SubTitle = ({ children }: { children: string }): ReactNode => {
    return (
        <h6 className="opacity-70 uppercase text-sm font-semibold my-3">
            {children}
        </h6>
    );
};
const BodyContainer = ({ children }: { children: ReactNode }): ReactNode => {
    return <div className="[&>*]:my-0!">{children}</div>;
};

const ImageContainer = ({ children }: { children: ReactNode }): ReactNode => {
    return <div className="w-full h-full relative">{children}</div>;
};

const Overlay = ({
    color,
    reverse,
}: {
    color: ThemeColor;
    reverse: boolean;
}): ReactNode => {
    const classes: { [K in ThemeColor]: string } = {
        dust: "bg-dust/20 hover:bg-dust/40",
        mist: "bg-mist/20 hover:bg-mist/40",
        moss: "bg-moss/20 hover:bg-moss/40",
        pine: "bg-pine/20 hover:bg-pine/40",
        cream: "bg-cream/20 hover:bg-cream/40",
        fog: "bg-fog/20 hover:bg-fog/40",
        matcha: "bg-matcha/20 hover:bg-matcha/40",
    };
    return (
        <div
            className={cn(
                "absolute top-0 right-0 left-0 bottom-0 w-full h-full transition-colors duration-700",
                reverse
                    ? "rounded-bl rounded-br @5xl/mdx:rounded-tl @5xl/mdx:rounded-br-none"
                    : "rounded-br rounded-bl @5xl/mdx:rounded-tr @5xl/mdx:rounded-bl-none",
                classes[color],
            )}
        />
    );
};

const DataColumnContainer = ({
    children,
}: {
    children: ReactNode;
}): ReactNode => {
    return <div className="py-6 @5xl/mdx:py-12 px-8">{children}</div>;
};

export const ColoredGridSection = ({
    children,
    ..._props
}: ColoredGridSectionProps): ReactNode => {
    const {
        title,
        subtitle,
        sizeClasses,
        colorClasses,
        reverse,
        color,
        img,
        titleFont,
        imgAlt,
    } = colorGridSectionProps.parse(_props);
    if (reverse) {
        return (
            <MainContainer
                reverse={true}
                className={`${sizeClasses} ${colorClasses}`}
            >
                <ImageContainer>
                    <Image
                        src={img}
                        width={1080}
                        height={1080}
                        alt={imgAlt}
                        className="object-cover w-full h-full my-0! rounded-tl rounded-tr rounded-bl-none @5xl/mdx:rounded-tl @5xl/mdx:rounded-bl @5xl/mdx:rounded-tr-none"
                    />
                    <Overlay reverse={true} color={color} />
                </ImageContainer>
                <DataColumnContainer>
                    <Title font={titleFont} color={color}>
                        {title}
                    </Title>
                    {subtitle ? <SubTitle>{subtitle}</SubTitle> : null}
                    <BodyContainer>{children}</BodyContainer>
                </DataColumnContainer>
            </MainContainer>
        );
    }
    return (
        <MainContainer reverse={false} className={`${sizeClasses} ${colorClasses}`}>
            <DataColumnContainer>
                <Title font={titleFont}>{title}</Title>
                {subtitle ? <SubTitle>{subtitle}</SubTitle> : null}
                <BodyContainer>{children}</BodyContainer>
            </DataColumnContainer>
            <ImageContainer>
                <Image
                    className={cn(
                        "object-cover w-full h-full my-0! rounded-tr rounded-tl @5xl/mdx:rounded-tr @5xl/mdx:rounded-br @5xl/mdx:rounded-tl-none",
                    )}
                    src={img}
                    width={1080}
                    height={1080}
                    alt={imgAlt}
                />
                <Overlay color={color} reverse={false} />
            </ImageContainer>
        </MainContainer>
    );
};

ColoredGridSection.displayName = "ColoredGridSection";
