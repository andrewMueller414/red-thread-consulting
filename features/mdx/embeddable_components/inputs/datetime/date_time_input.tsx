import React, { useState, type ReactNode } from "react";
import {
    DateTimeInputSchemaOutput,
    DateTimeNestedInputProps,
} from "./date_time_input_schema";
import { useFormContext } from "react-hook-form";
import {
    MdxFormData,
    NestedFormValueOfType,
} from "../../../data/schemas/mdx_form_response";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
    FieldGroup,
    Field,
    FieldLabel,
} from "../../../../../components/ui/field";
import { Input } from "../../../../../components/ui/input";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
dayjs.extend(advancedFormat);

export const DateTimeInput = ({
    name,
    dateLabel,
    datePlaceholder,
    timeLabel,
    setDate,
}: DateTimeInputSchemaOutput & DateTimeNestedInputProps): ReactNode => {
    const [dateOpen, setDateOpen] = useState(false);
    const form = useFormContext<MdxFormData>();
    const date = form.watch(name) as
        | NestedFormValueOfType<Date>
        | null
        | undefined;
    console.log("dateOpen: ", dateOpen);
    return (
        <FieldGroup className="mx-auto max-w-xs flex-row">
            <Field>
                <FieldLabel htmlFor="date-picker-optional">{dateLabel}</FieldLabel>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker-optional"
                            className="w-32 justify-between font-normal bg-matcha"
                            onClick={() => setDateOpen(true)}
                        >
                            {date?.value
                                ? dayjs(date.value).format("MMM DD, YYYY h:mm A")
                                : datePlaceholder}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date?.value ?? new Date()}
                            captionLayout="dropdown"
                            defaultMonth={date?.value ?? new Date()}
                            /* styles={{ */
                            /*     selected: { */
                            /*         backgroundColor: "red", */
                            /*     }, */
                            /* }} */
                            onSelect={(newDate) => {
                                if (newDate) {
                                    setDate(newDate);
                                    setDateOpen(false);
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <Field className="w-32">
                <FieldLabel htmlFor="time-picker-optional">{timeLabel}</FieldLabel>
                <Input
                    type="time"
                    id="time-picker-optional"
                    step="1"
                    defaultValue="10:30:00"
                    className="bg-matcha focus-visible:bg-fog appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </Field>
        </FieldGroup>
    );
};

DateTimeInput.displayName = "DateTimeInput";
