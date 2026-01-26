"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useEffectEvent, type ReactNode } from "react";
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
  const handleSubmit = (data: z.infer<typeof form>): void => {
    console.log("data: ", data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={
          "w-full min-w-full h-full prose prose-h2:mt-0 prose-h3:my-4i prose-p:text-center @5xl/mdx:prose-p:text-left"
        }
      >
        {children}
      </form>
    </FormProvider>
  );
};

MdxFormContainer.displayName = "MdxFormContainer";
