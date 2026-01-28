import Image from "next/image";
import React, { CSSProperties, type ReactNode } from "react";
import z from "zod";
import { cn } from "../../../../lib/utils";

export const sizeEnum = z.union([
    z.literal("small"),
    z.literal("medium"),
    z.literal("large"),
]);

const imageSchema = z.object({
    url: z.string().url(),
    maxWidth: sizeEnum.or(z.number()).optional(),
    maxHeight: sizeEnum.or(z.number()).optional(),
    right: z.boolean().default(false),
    left: z.boolean().default(true),
    alt: z.string({
        message:
            "Alternative text is important for describing this image for people with visual disabilities and search engine optimization",
    }),
});

export type EmbeddableImageProps = z.infer<typeof imageSchema>;

export const EmbeddableImage = ({
    style,
    ...props
}: EmbeddableImageProps & { style?: CSSProperties }): ReactNode => {
    const { url, maxWidth, maxHeight, right, left, alt } =
        imageSchema.parse(props);
    const classes: string[] = [];
    if (typeof maxWidth === "string") {
        classes.push(
            {
                small: "max-w-[200px]",
                medium: "max-w-[325px]",
                large: "max-w-[450px]",
            }[maxWidth],
        );
    }

    if (typeof maxHeight === "string") {
        classes.push(
            {
                small: "max-h-[200px]",
                medium: "max-h-[350px]",
                large: "max-h-[min(90vh,550px)]",
            }[maxHeight],
        );
    }

    if (!maxHeight && !maxWidth) {
        classes.push("max-w-[min(540px,90%)]");
    }

    if (right) {
        classes.push("@5xl/mdx:float-right @5xl/mdx:ml-6");
    } else if (left) {
        classes.push("@5xl/mdx:float-left @5xl/mdx:mr-6");
    }

    return (
        <img // NOTE: Use html image element for now. Convert this to Nexts image component once image storage is in place.
            src={url}
            alt={alt}
            width={1080}
            height={1080}
            className={cn(...classes)}
            style={{
                maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : undefined,
                maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : undefined,
                ...style,
            }}
        />
    );
};

EmbeddableImage.displayName = "EmbeddableImage";
