"use client";
import React, { type ReactNode } from "react";
import {
    dateTimeInputSchema,
    DateTimeInputSchema,
} from "./date_time_input_schema";
import { DateTimeInput } from "./date_time_input";
import { DateInput } from "./date_input";
import { useFormInitialValue } from "@/features/mdx/state/hooks/use_form_initial_value";
import {
    DateTimeMeta,
    InputId,
    MdxFormData,
    PreviewComponentProps,
} from "@/features/mdx/data/schemas/mdx_form_response";
import { useFormContext } from "react-hook-form";

export const DateTimeInputSwitch = ({
    ...props
}: DateTimeInputSchema & PreviewComponentProps<Date>): ReactNode => {
    const _props = dateTimeInputSchema.parse(props);
    useFormInitialValue<DateTimeMeta>(_props.name, InputId.dateTime, new Date(), {
        datePlaceholder: props.datePlaceholder,
        timeLabel: props.timeLabel,
        dateLabel: props.dateLabel,
        time: props.time,
    });
    const form = useFormContext<MdxFormData>();
    const setDate = (newDate: Date): void => {
        form.setValue(_props.name, {
            value: newDate,
            inputId: InputId.dateTime,
            meta: {
                datePlaceholder: props.datePlaceholder,
                timeLabel: props.timeLabel,
                dateLabel: props.dateLabel,
                time: props.time,
            },
        });
    };
    if (props.time) {
        return (
            <DateTimeInput
                {..._props}
                disabled={props.disabled}
                valueOverride={props.valueOverride}
                setDate={setDate}
            />
        );
    } else {
        return (
            <DateInput
                {..._props}
                disabled={props.disabled}
                valueOverride={props.valueOverride}
                setDate={setDate}
            />
        );
    }
};

DateTimeInputSwitch.displayName = "DateTimeInputSwitch";
