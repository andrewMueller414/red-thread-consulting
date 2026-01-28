import React, { useEffect, useEffectEvent, type ReactNode } from "react";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { FormResponse } from "../../../lib/generated/prisma/client";

const submitFormProps = z.object({
    form: z
        .string()
        .min(1, "Please make sure the form field is not empty.")
        .max(200, "Please keep the id under 200 characters"),
    label: z.string().default("Submit"),
});

export type SubmitFormProps = z.infer<typeof submitFormProps>;

export const SubmitForm = (props: SubmitFormProps): ReactNode => {
    const { form: formId, label } = submitFormProps.parse(props);
    const form = useForm<FormResponse>();

    const setFormId = useEffectEvent((fi: string) =>
        form.setValue("mdxSourceId", fi),
    );

    useEffect(() => {
        setFormId(formId);
    }, [formId]);

    return (
        <Button className="bg-matcha hover:bg-matcha/90 text-pine hover:text-pine transition-colors duration-300">
            {label}
        </Button>
    );
};

SubmitForm.displayName = "SubmitForm";
