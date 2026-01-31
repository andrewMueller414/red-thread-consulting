"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formDataSchema } from "../data/schemas/mdx_form_response";
import { MdxFormProvider } from "../state/form_context";

export const MdxFormContainer = ({
    children,
}: {
    children: ReactNode;
}): ReactNode => {
    const form = useForm({
        resolver: zodResolver(formDataSchema),
    });

    return (
        <FormProvider {...form}>
            <MdxFormProvider>
                <form
                    className={
                        "w-full min-w-full h-full min-h-0 prose prose-h2:mt-0 prose-h3:my-4 prose-blockquote:border-dust"
                    }
                >
                    {children}
                </form>
            </MdxFormProvider>
        </FormProvider>
    );
};

MdxFormContainer.displayName = "MdxFormContainer";
