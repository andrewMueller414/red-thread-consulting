"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { CSSProperties, HTMLProps, type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formDataSchema } from "../data/schemas/mdx_form_response";
import { MdxFormProvider } from "../state/form_context";
import { cn } from "../../../lib/utils";

export const MdxFormWrapper = ({
    children,
}: {
    children: ReactNode;
}): ReactNode => {
    const form = useForm({
        resolver: zodResolver(formDataSchema),
    });
    return (
        <FormProvider {...form}>
            <MdxFormProvider>{children}</MdxFormProvider>
        </FormProvider>
    );
};

export const MdxFormContainer = ({
    children,
    className,
}: {
    className?: string;
    children: ReactNode;
}): ReactNode => {
    return (
        <MdxFormWrapper>
            <form className={cn("w-full min-w-full h-full min-h-0", className)}>
                {children}
            </form>
        </MdxFormWrapper>
    );
};

MdxFormContainer.displayName = "MdxFormContainer";
