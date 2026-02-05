import React, { useMemo, useState, type ReactNode } from "react";
import {
    DateTimeInputSchemaOutput,
    DateTimeNestedInputProps,
} from "./date_time_input_schema";
import { useFormContext } from "react-hook-form";
import {
    DateTimeMeta,
    InputId,
    MdxFormData,
    NestedFormValueOfType,
    PreviewComponentProps,
} from "../../../data/schemas/mdx_form_response";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
    FieldGroup,
    Field,
    FieldLabel,
} from "../../../../../components/ui/field";
import { Input } from "../../../../../components/ui/input";
import dayjs, { UnitType } from "dayjs";
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
    disabled,
    time,
    valueOverride,
    ...props
}: DateTimeInputSchemaOutput &
    DateTimeNestedInputProps &
    PreviewComponentProps<Date, DateTimeMeta>): ReactNode => {
    const [dateOpen, setDateOpen] = useState(false);
    const form = useFormContext<MdxFormData>();
    const date = form.watch(name) as
        | NestedFormValueOfType<Date>
        | null
        | undefined;

    const years: { from: number; to: number } = useMemo(() => {
        const toYear =
            "toYear" in props && props.toYear
                ? props.toYear
                : "past" in props && props.past
                    ? new Date().getFullYear()
                    : new Date().getFullYear() + 20;
        const fromYear =
            "fromYear" in props && props.fromYear
                ? props.fromYear
                : "past" in props && props.past
                    ? new Date().getFullYear() - 100
                    : new Date().getFullYear();
        return {
            to: toYear,
            from: fromYear,
        };
    }, [props]);
    const formatDate = (d: Date): string => {
        return dayjs(d).format("MMM DD, YYYY");
    };
    const getFormattedTime = (dt: Date): string => {
        const d = dayjs(dt);
        const formatUnit = (n: string): string => {
            const s = `${n}`;
            if (s.length === 2) {
                return n;
            }
            if (s.length <= 2) {
                return formatUnit(`0${n}`);
            }
            return n;
        };
        return `${formatUnit(d.get("hours").toString())}:${formatUnit(d.get("minutes").toString())}:${formatUnit(d.get("seconds").toString())}`;
    };
    return (
        <FieldGroup className="max-w-xs flex flex-col sm:flex-row w-full">
            <Field>
                <FieldLabel htmlFor="date-picker">{dateLabel}</FieldLabel>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal bg-matcha"
                            onClick={() => setDateOpen(true)}
                            disabled={disabled}
                        >
                            {valueOverride
                                ? formatDate(valueOverride)
                                : date?.value
                                    ? formatDate(date.value)
                                    : datePlaceholder}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={valueOverride ?? date?.value ?? new Date()}
                            captionLayout="dropdown"
                            disabled={disabled}
                            defaultMonth={valueOverride ?? date?.value ?? new Date()}
                            toYear={years.to}
                            fromYear={years.from}
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
                <FieldLabel htmlFor="time-picker">{timeLabel}</FieldLabel>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue={
                        valueOverride ? getFormattedTime(valueOverride) : "10:30:00"
                    }
                    className="bg-matcha focus-visible:bg-fog appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none focus:bg-matcha"
                    disabled={disabled}
                    onChange={(e) => {
                        let d = dayjs(date?.value ?? new Date());
                        e.target.value.split(":").forEach((s, i) => {
                            if (i > 3) {
                                return;
                            }
                            const unit: UnitType = (
                                ["hours", "minutes", "seconds"] satisfies UnitType[]
                            )[i];
                            let val = parseInt(s);
                            if (!Number.isNaN(val)) {
                                if (unit === "hours" && val === 0) {
                                    val = 1;
                                }
                                d = d.set(unit, val);
                            }
                        });
                        setDate(d.toDate());
                    }}
                />
            </Field>
        </FieldGroup>
    );
};

DateTimeInput.displayName = "DateTimeInput";
