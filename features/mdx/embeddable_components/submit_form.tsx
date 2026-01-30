import React, {
    MouseEvent,
    MouseEventHandler,
    useEffect,
    useEffectEvent,
    type ReactNode,
} from "react";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { FormResponse } from "../../../lib/generated/prisma/client";
import { useMdxFormDispatch } from "../state/form_context";

const submitFormProps = z.object({
    formId: z
        .string()
        .min(1, "Please make sure the form field is not empty.")
        .max(200, "Please keep the id under 200 characters"),
    label: z.string().default("Submit"),
});

export type SubmitFormProps = z.infer<typeof submitFormProps>;

export const SubmitForm = (props: SubmitFormProps): ReactNode => {
    const { formId, label } = submitFormProps.parse(props);
    const form = useForm<FormResponse>();
    const dispatch = useMdxFormDispatch();

    const setFormId = useEffectEvent((fi: string) =>
        dispatch({
            type: "setMdxSourceId",
            payload: fi,
        }),
    );

    useEffect(() => {
        setFormId(formId);
    }, [formId]);

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
        e,
    ): Promise<void> => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit(async (data) => {
            console.log("data: ", data);
        })();
    };

    return (
        <Button
            className="bg-matcha hover:bg-matcha/90 text-pine hover:text-pine transition-colors duration-300"
            onClick={handleSubmit}
        >
            {label}
        </Button>
    );
};

SubmitForm.displayName = "SubmitForm";
