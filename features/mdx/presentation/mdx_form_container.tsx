"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mdxFormSchema } from "../data/schemas/mdx_form_response";
import { z } from "zod";

export const MdxFormContainer = ({
    children,
}: {
    children: ReactNode;
}): ReactNode => {
    const form = useForm({
        resolver: zodResolver(mdxFormSchema),
    });
    const handleSubmit = async (data: z.infer<typeof form>): Promise<void> => {
        console.log("data: ", data);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={"w-full min-w-full h-full prose prose-h2:mt-0 prose-h3:my-4"}
            >
                {children}
            </form>
        </FormProvider>
    );
};

MdxFormContainer.displayName = "MdxFormContainer";
