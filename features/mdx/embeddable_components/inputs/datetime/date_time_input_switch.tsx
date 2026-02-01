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
} from "@/features/mdx/data/schemas/mdx_form_response";
import { useFormContext } from "react-hook-form";

export const DateTimeInputSwitch = ({
    time,
    ...props
}: DateTimeInputSchema & { time?: boolean }): ReactNode => {
    const _props = dateTimeInputSchema.parse(props);
    useFormInitialValue<DateTimeMeta>(_props.name, InputId.dateTime, new Date(), {
        datePlaceholder: props.datePlaceholder,
        timeLabel: props.timeLabel,
        dateLabel: props.dateLabel,
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
            },
        });
    };
    if (time) {
        return <DateTimeInput {..._props} setDate={setDate} />;
    } else {
        return <DateInput {..._props} />;
    }
};

DateTimeInputSwitch.displayName = "DateTimeInputSwitch";
