import React, { MouseEventHandler, type ReactNode } from "react";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { useFormContext } from "react-hook-form";
import { MdxFormData } from "../data/schemas/mdx_form_response";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
import { RedThreadError } from "@/core/errors/red_thread_error";
import { useSession } from "next-auth/react";
import { useRenderedMdxFormContext } from "@/features/forms/state/rendered_mdx_form_context";
import { usePathname } from "next/navigation";
import { Route } from "next";

const submitFormProps = z.object({
    label: z.string().default("Submit"),
    notificationBody: z.string().default("Form submitted successfully"),
    notificationTitle: z.string().default("Thank you"),
    notificationErrorTitle: z.string().default("Oh no."),
    notificationErrorBody: z
        .string()
        .default(
            "An error occurred. Someone will address this as soon as possible.",
        ),
});

export type SubmitFormProps = z.infer<typeof submitFormProps>;

export const SubmitForm = (props: SubmitFormProps): ReactNode => {
    const {
        label,
        notificationTitle,
        notificationBody,
        notificationErrorBody,
        notificationErrorTitle,
    } = submitFormProps.parse(props);
    const session = useSession();
    const pathname = usePathname() as Route;
    const { mdxSourceId } = useRenderedMdxFormContext();
    const form = useFormContext<MdxFormData>();
    const formMutation = trpc.form.create.useMutation();

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
        e,
    ): Promise<void> => {
        e.stopPropagation();
        e.preventDefault();
        const isValid = await form.trigger();
        if (isValid) {
            if (pathname !== "/admin/mdx/editor") {
                formMutation.mutate(
                    {
                        data: form.getValues(),
                        mdxSourceId,
                    },
                    {
                        onError: (e) => {
                            if ("cause" in e) {
                                if (e.cause === RedThreadError.formIdDoesNotExist) {
                                    if (session) {
                                        showNotification({
                                            title: "Error",
                                            message: e.message,
                                            duration: 5000,
                                            variant: "info",
                                        });
                                    }
                                }
                            }
                            console.error("Error: ", e.message);
                        },
                        onSuccess: (success) => {
                            if (success) {
                                showNotification({
                                    title: notificationTitle,
                                    message: notificationBody,
                                    duration: 5000,
                                    variant: "info",
                                });
                                form.reset();
                            } else {
                                showNotification({
                                    title: notificationErrorTitle,
                                    message: notificationErrorBody,
                                    duration: 5000,
                                    variant: "info",
                                });
                            }
                        },
                    },
                );
            } else {
                console.log("Data: ", form.getValues());
            }
        } else {
            console.log("errors: ", form.formState.errors);
        }
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
