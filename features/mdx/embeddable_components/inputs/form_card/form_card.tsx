import React, { type ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../../../components/ui/card";
import { z } from "zod";
import {
    getSizePropsString,
    sizeEnumWithFull,
    sizePropsObject,
    sizeWidthTransform,
} from "../../media/image";
import {
    colorEnumRecord,
    themeColorBackgroundRecordToString,
} from "../../shared_schemas";

const formCardPropsSchema = sizePropsObject
    .merge(colorEnumRecord)
    .extend({
        title: z.string({
            message: "Please provide a title property to the Card component.",
        }),
        subtitle: z.string().optional(),
        width: sizeEnumWithFull.default("full").transform(sizeWidthTransform),
    })
    .transform((c) => {
        return {
            ...c,
            sizeClasses: `${getSizePropsString(c)} ${themeColorBackgroundRecordToString(c)}`,
        };
    });

export type FormCardProps = z.infer<typeof formCardPropsSchema> & {
    children: ReactNode;
};

export const FormCard = ({ children, ...props }: FormCardProps): ReactNode => {
    const { title, subtitle, sizeClasses } = formCardPropsSchema.parse(props);
    return (
        <Card className={sizeClasses}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

FormCard.displayName = "FormCard";
