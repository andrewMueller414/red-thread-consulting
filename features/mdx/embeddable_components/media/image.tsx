import React, { CSSProperties, type ReactNode } from "react";
import z from "zod";
import { cn } from "../../../../lib/utils";
import Image from "next/image";

export const sizeEnum = z.union(
    [z.literal("small"), z.literal("medium"), z.literal("large")],
    "Please select a value of 'small', 'medium', or 'large'",
);

export type SizeEnum = z.infer<typeof sizeEnum>;

export const sizeEnumWithFull = z.union(
    [
        z.literal("small"),
        z.literal("medium"),
        z.literal("large"),
        z.literal("full"),
    ],
    "Please select a value of 'small', 'medium', 'large' or 'full'.",
);

export type SizeEnumWithFull = z.infer<typeof sizeEnumWithFull>;

const imageSchema = z.object({
    url: z.string().url(),
    alt: z.string({
        message:
            "Please provide an 'alt' property that's a string. Alternative text is important for describing this image for people with visual disabilities and search engine optimization.",
    }),
    maxWidth: sizeEnum.or(z.number()).optional(),
    maxHeight: sizeEnum.or(z.number()).optional(),
    right: z.boolean().default(false),
    left: z.boolean().default(true),
});

export type EmbeddableImageProps = z.infer<typeof imageSchema>;

export const EmbeddableImage = ({
    style,
    ...props
}: EmbeddableImageProps & { style?: CSSProperties }): ReactNode => {
    const rem = 16;
    const { url, maxWidth, maxHeight, right, left, alt } =
        imageSchema.parse(props);
    const classes: string[] = [];
    if (typeof maxWidth === "string") {
        classes.push(
            {
                small: "max-w-[min(200px,90%)]",
                medium: "max-w-[min(325px,90%)]",
                large: "max-w-[min(450px,90%)]",
            }[maxWidth],
        );
    }

    if (typeof maxHeight === "string") {
        classes.push(
            {
                small: "max-h-[min(200px,90%)]",
                medium: "max-h-[min(350px,90%)]",
                large: "max-h-[min(90vh,550px)]",
            }[maxHeight],
        );
    }

    if (!maxHeight && !maxWidth) {
        classes.push("max-w-[min(540px,90%)]");
    }

    if (right) {
        if (maxWidth) {
            if (typeof maxWidth === "string") {
                classes.push(
                    {
                        small:
                            "@md/mdx:float-right @md/mdx:ml-0 @md/mdx:ml-6 ml-auto ml-auto",
                        medium:
                            "@lg/mdx:float-right @lg/mdx:ml-0 @lg/mdx:ml-6 ml-auto ml-auto",
                        large:
                            "@2xl/mdx:float-right @2xl/mdx:ml-0 @2xl/mdx:ml-6 ml-auto ml-auto",
                    }[maxWidth],
                );
            } else {
                const _maxWidth =
                    maxWidth <= 200 ? "small" : maxWidth <= 350 ? "medium" : "large";
                classes.push(
                    {
                        small:
                            "@md/mdx:float-right @md/mdx:ml-0 @md/mdx:ml-6 ml-auto ml-auto",
                        medium:
                            "@lg/mdx:float-right @lg/mdx:ml-0 @lg/mdx:ml-6 ml-auto ml-auto",
                        large:
                            "@2xl/mdx:float-right @2xl/mdx:ml-0 @2xl/mdx:ml-6 ml-auto ml-auto",
                    }[_maxWidth],
                );
            }
        } else {
            classes.push("float-right ml-6");
        }
    } else if (left) {
        if (maxWidth) {
            if (typeof maxWidth === "string") {
                classes.push(
                    {
                        small:
                            "@md/mdx:float-left @md/mdx:ml-0 @md/mdx:mr-6 ml-auto mr-auto",
                        medium:
                            "@lg/mdx:float-left @lg/mdx:ml-0 @lg/mdx:mr-6 ml-auto mr-auto",
                        large:
                            "@2xl/mdx:float-left @2xl/mdx:ml-0 @2xl/mdx:mr-6 ml-auto mr-auto",
                    }[maxWidth],
                );
            } else {
                const _maxWidth =
                    maxWidth <= 200 ? "small" : maxWidth <= 350 ? "medium" : "large";
                classes.push(
                    {
                        small:
                            "@md/mdx:float-left @md/mdx:ml-0 @md/mdx:mr-6 ml-auto mr-auto",
                        medium:
                            "@lg/mdx:float-left @lg/mdx:ml-0 @lg/mdx:mr-6 ml-auto mr-auto",
                        large:
                            "@2xl/mdx:float-left @2xl/mdx:ml-0 @2xl/mdx:mr-6 ml-auto mr-auto",
                    }[_maxWidth],
                );
            }
        } else {
            classes.push("float-left mr-6");
        }
    }

    return (
        <Image
            src={url}
            alt={alt}
            width={1080}
            height={1080}
            className={cn("img-comp object-contain rounded", ...classes)}
            style={{
                maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : undefined,
                maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : undefined,
                ...style,
            }}
        />
    );
};

EmbeddableImage.displayName = "EmbeddableImage";
