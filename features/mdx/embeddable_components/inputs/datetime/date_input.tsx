import React, { useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
    DateTimeInputSchemaOutput,
    DateTimeMeta,
    DateTimeNestedInputProps,
    MdxFormData,
    NestedFormValueOfType,
    PreviewComponentProps,
} from "../../../data/schemas/mdx_form_response";
import { Field, FieldLabel } from "../../../../../components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../components/ui/popover";
import { Calendar } from "../../../../../components/ui/calendar";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button } from "../../../../../components/ui/button";
import { CalendarIcon } from "lucide-react";
dayjs.extend(advancedFormat);

export const DateInput = ({
    name,
    setDate,
    datePlaceholder,
    disabled,
    ...props
}: DateTimeInputSchemaOutput &
    DateTimeNestedInputProps &
    PreviewComponentProps<Date, DateTimeMeta>): ReactNode => {
    const [open, setOpen] = useState(false);
    const form = useFormContext<MdxFormData>();
    const date = form.watch(name) as
        | NestedFormValueOfType<Date>
        | undefined
        | null;

    return (
        <div className="w-full">
            <Field className="w-44">
                <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker-simple"
                            className="justify-start font-normal bg-matcha"
                            disabled={disabled}
                        >
                            <CalendarIcon className="text-dust/80" />
                            {props.valueOverride ? (
                                dayjs(props.valueOverride).format("MMMM DD, YYYY")
                            ) : date?.value ? (
                                dayjs(date.value).format("MMMM DD, YYYY")
                            ) : (
                                <span>{datePlaceholder}</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            required
                            captionLayout="dropdown"
                            selected={date?.value ?? new Date()}
                            onSelect={(newDate) => {
                                if (newDate) {
                                    setDate(newDate);
                                    setOpen(false);
                                }
                            }}
                            fromYear={"fromYear" in props ? props.fromYear : undefined}
                            toYear={"toYear" in props ? props.toYear : undefined}
                            defaultMonth={date?.value ?? new Date()}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
        </div>
    );
};

DateInput.displayName = "DateInput";
