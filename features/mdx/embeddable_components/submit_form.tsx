import React, { MouseEventHandler, type ReactNode } from "react";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { useFormContext } from "react-hook-form";
import { MdxFormData } from "../data/schemas/mdx_form_response";
import { trpc } from "@/features/trpc/trpc_provider";
import { showNotification } from "@/features/notifications/notification_utils";
import { RedThreadError } from "@/core/errors/red_thread_error";
import { useSession } from "next-auth/react";
import {
    useRenderedMdxFormContext,
    useRenderedMdxFormDispatch,
} from "@/features/forms/state/rendered_mdx_form_context";
import { usePathname } from "next/navigation";
import { Route } from "next";
import {
    colorEnumRecord,
    firstThemeColorValue,
    themeColorBackgroundRecordToString,
    ThemeColorRecord,
} from "./shared_schemas";
import { cn } from "../../../lib/utils";
import Icon from "../../../core/shared_components/dynamic_icon";
import type { dynamicIconImports } from "lucide-react/dynamic";

const submitFormProps = colorEnumRecord
    .extend({
        label: z.string().default("Submit"),
        icon: z.string().optional().describe("An optional lucide icon name."),
        notificationBody: z.string().default("Form submitted successfully"),
        notificationTitle: z.string().default("Thank you"),
        notificationErrorTitle: z.string().default("Oh no."),
        notificationErrorBody: z
            .string()
            .default(
                "An error occurred. Someone will address this as soon as possible.",
            ),
    })
    .transform((c) => {
        /* const colorClasses =  */
        const hoverClasses: { [K in keyof ThemeColorRecord]: string } = {
            cream: "hover:bg-cream/80",
            dust: "hover:bg-dust/80",
            fog: "hover:bg-fog/80",
            matcha: "hover:bg-matcha/80",
            mist: "hover:bg-mist/80",
            moss: "hover:bg-moss/80",
            pine: "hover:bg-pine/80",
        };
        const k = firstThemeColorValue(c);
        return {
            ...c,
            colorClasses:
                typeof k === "undefined"
                    ? undefined
                    : `${themeColorBackgroundRecordToString(c)} ${hoverClasses[k]}`,
        };
    });

export type SubmitFormProps = z.infer<typeof submitFormProps>;

export const SubmitForm = (props: SubmitFormProps): ReactNode => {
    const {
        label,
        notificationTitle,
        notificationBody,
        notificationErrorBody,
        notificationErrorTitle,
        colorClasses,
        icon,
    } = submitFormProps.parse(props);
    const session = useSession();
    const pathname = usePathname() as Route;
    const { mdxSourceId, submitting } = useRenderedMdxFormContext();
    const formDispatch = useRenderedMdxFormDispatch();
    const form = useFormContext<MdxFormData>();
    const formMutation = trpc.form.create.useMutation();

    const setSubmitting = (payload: boolean): void => {
        formDispatch({
            type: "setSubmitting",
            payload,
        });
    };

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
        e,
    ): Promise<void> => {
        e.stopPropagation();
        e.preventDefault();
        if (submitting) {
            return;
        }
        const isValid = await form.trigger();
        if (isValid) {
            if (pathname !== "/admin/mdx/editor") {
                setSubmitting(true);
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
                            setSubmitting(false);
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
                                setSubmitting(false);
                            } else {
                                showNotification({
                                    title: notificationErrorTitle,
                                    message: notificationErrorBody,
                                    duration: 5000,
                                    variant: "info",
                                });
                                setSubmitting(false);
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
            className={cn(
                "bg-matcha hover:bg-matcha/90 text-pine hover:text-pine transition-colors duration-300",
                colorClasses,
            )}
            onClick={handleSubmit}
        >
            {icon ? <Icon name={icon as keyof typeof dynamicIconImports} /> : null}
            {label}
        </Button>
    );
};

SubmitForm.displayName = "SubmitForm";
