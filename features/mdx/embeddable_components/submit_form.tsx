import React, {
    MouseEventHandler,
    useEffect,
    useEffectEvent,
    type ReactNode,
} from "react";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { useFormContext } from "react-hook-form";
import { useMdxFormDispatch } from "../state/form_context";
import { MdxFormData } from "../data/schemas/mdx_form_response";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
import { RedThreadError } from "@/core/errors/red_thread_error";
import { useSession } from "next-auth/react";
import { useRenderedMdxFormContext } from "@/features/forms/state/rendered_mdx_form_context";
import { usePathname } from "next/navigation";
import { AppRoutes } from "@/.next/dev/types/routes";

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
    const pathname = usePathname() as AppRoutes;
    const { mdxSourceId } = useRenderedMdxFormContext();
    const form = useFormContext<MdxFormData>();
    const dispatch = useMdxFormDispatch();
    const formMutation = trpc.form.create.useMutation();

    const setFormId = useEffectEvent((fi: string) =>
        dispatch({
            type: "setMdxSourceId",
            payload: fi,
        }),
    );

    useEffect(() => {
        setFormId(mdxSourceId);
    }, [mdxSourceId]);

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
