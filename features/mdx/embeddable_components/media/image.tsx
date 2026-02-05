import React, { CSSProperties, type ReactNode } from "react";
import z from "zod";
import { cn } from "../../../../lib/utils";
import Image from "next/image";

export const sizeEnum = z.union(
    [z.literal("small"), z.literal("medium"), z.literal("large")],
    "Please select a value of 'small', 'medium', or 'large'",
);

export type SizeEnum = z.infer<typeof sizeEnum>;

export const sizeEnumWithFull = z.enum(
    ["small", "medium", "large", "full", "fit"],
    "Please select a value of 'small', 'medium', 'large', 'fit', or 'full'.",
);

export const heightEnum = z
    .union(
        [
            z.literal("screen"),
            z.literal("max-screen"),
            z.literal("min-screen"),
            z.literal("fit"),
        ],
        "Please select a value of 'screen', 'max-screen', 'min-screen' or 'fit'.",
    )
    .transform((c) => {
        switch (c) {
            case "screen": {
                return "h-screen";
            }
            case "max-screen": {
                return "max-h-screen";
            }
            case "min-screen": {
                return "min-h-screen";
            }
            case "fit": {
                return "h-fit";
            }
        }
    });

export const parsedHeightEnum = z.union([
    z.literal("h-screen"),
    z.literal("max-h-screen"),
    z.literal("min-h-screen"),
    z.literal("h-fit"),
]);

export const sizeWidthTransform = (
    data: z.infer<typeof sizeEnumWithFull> | undefined,
) => {
    switch (data) {
        case "small": {
            return "@sm/mdx:w-45";
        }
        case "medium": {
            return "@md/mdx:w-90";
        }
        case "large": {
            return "@2xl/mdx:w-180";
        }
        case "fit": {
            return "w-fit";
        }
        case "full": {
            return "w-full";
        }
    }
    if (typeof data === "string") {
        return data;
    }
};

export type SizeEnumWithFull = z.infer<typeof sizeEnumWithFull>;

export const sizePropsObject = z.object({
    height: heightEnum.optional(),
    width: sizeEnumWithFull.optional().transform(sizeWidthTransform),
    gap: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "gap-2";
            }
            case "medium": {
                return "gap-4";
            }
            case "large": {
                return "gap-6";
            }
        }
    }),
    gapX: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "gap-x-2";
            }
            case "medium": {
                return "gap-x-4";
            }
            case "large": {
                return "gap-x-6";
            }
        }
    }),
    gapY: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "gap-y-2";
            }
            case "medium": {
                return "gap-y-4";
            }
            case "large": {
                return "gap-y-6";
            }
        }
    }),
    marginTop: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "mt-2";
            }
            case "medium": {
                return "mt-4";
            }
            case "large": {
                return "mt-6";
            }
        }
    }),
    marginBottom: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "mb-2";
            }
            case "medium": {
                return "mb-4";
            }
            case "large": {
                return "mb-6";
            }
        }
    }),
    marginLeft: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "ml-2";
            }
            case "medium": {
                return "ml-4";
            }
            case "large": {
                return "ml-6";
            }
        }
    }),
    marginRight: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "mr-2";
            }
            case "medium": {
                return "mr-4";
            }
            case "large": {
                return "mr-6";
            }
        }
    }),
    marginX: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "mx-2";
            }
            case "medium": {
                return "mx-4";
            }
            case "large": {
                return "mx-6";
            }
        }
    }),
    marginY: sizeEnum.optional().transform((c) => {
        switch (c) {
            case "small": {
                return "my-2";
            }
            case "medium": {
                return "my-4";
            }
            case "large": {
                return "my-6";
            }
        }
    }),
    colSpan: z
        .number()
        .optional()
        .transform((n) => {
            if (n) {
                switch (n) {
                    case 1:
                        return "col-span-1";
                    case 2:
                        return "col-span-2";
                    case 3:
                        return "col-span-3";
                    case 4:
                        return "col-span-4";
                    case 5:
                        return "col-span-5";
                    case 6:
                        return "col-span-6";
                    case 7:
                        return "col-span-7";
                    case 8:
                        return "col-span-8";
                    case 9:
                        return "col-span-9";
                    case 10:
                        return "col-span-10";
                    case 11:
                        return "col-span-11";
                    case 12:
                        return "col-span-12";
                }
            }
        }),
});

export const getSizePropsString = (
    data: z.infer<typeof sizePropsObject>,
): string => {
    const keys = [
        "gapY",
        "gap",
        "gapX",
        "height",
        "width",
        "colSpan",
        "marginY",
        "marginX",
        "marginRight",
        "marginLeft",
        "marginBottom",
        "marginTop",
    ] satisfies (keyof z.infer<typeof sizePropsObject>)[];
    let s = "";
    for (const k of keys) {
        if (data[k]) {
            s += data[k];
        }
    }
    return s;
};

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
