"use client";
import React, { type ReactNode } from "react";
import { DateTimeInput } from "./date_time_input";
import { DateInput } from "./date_input";
import { useFormInitialValue } from "@/features/mdx/state/hooks/use_form_initial_value";
import {
    DateTimeInputSchema,
    dateTimeInputSchema,
    DateTimeMeta,
    InputId,
    MdxFormData,
    PreviewComponentProps,
} from "@/features/mdx/data/schemas/mdx_form_response";
import { useFormContext } from "react-hook-form";

export const DateTimeInputSwitch = (
    props: Omit<DateTimeInputSchema, "inputId"> &
        PreviewComponentProps<Date, DateTimeMeta>,
): ReactNode => {
    const _props =
        props.meta ??
        dateTimeInputSchema.parse({
            ...props,
            inputId: InputId.dateTime,
        });
    useFormInitialValue<DateTimeMeta>(
        _props.name,
        InputId.dateTime,
        new Date(),
        _props,
    );
    const form = useFormContext<MdxFormData>();
    const setDate = (newDate: Date): void => {
        form.setValue(_props.name, {
            value: newDate,
            inputId: InputId.dateTime,
            meta: _props,
        });
    };
    if (props.time) {
        return (
            <DateTimeInput
                {..._props}
                disabled={props.disabled}
                valueOverride={props.valueOverride}
                setDate={setDate}
                meta={props.meta}
            />
        );
    } else {
        return (
            <DateInput
                {..._props}
                disabled={props.disabled}
                valueOverride={props.valueOverride}
                setDate={setDate}
                meta={props.meta}
            />
        );
    }
};

DateTimeInputSwitch.displayName = "DateTimeInputSwitch";
