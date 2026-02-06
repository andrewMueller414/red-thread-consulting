"use client";

import * as React from "react";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import {
    DayPicker,
    getDefaultClassNames,
    type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeColor } from "../../features/mdx/embeddable_components/shared_schemas";

interface CalendarClassesGroup {
    today?: string;
    navButton?: string;
}

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    color = "dust",
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
    color?: ThemeColor;
}) {
    const defaultClassNames = getDefaultClassNames();

    const classes: { [K in ThemeColor]: CalendarClassesGroup } = {
        matcha: {
            today: "bg-matcha/20",
            navButton: "hover:bg-matcha/40",
        },
        cream: {
            today: "bg-cream/20",
            navButton: "hover:bg-cream/40",
        },
        dust: {
            today: "bg-dust/20",
            navButton: "hover:bg-dust/40",
        },
        fog: {
            today: "bg-mist/20",
            navButton: "hover:bg-fog/40",
        },
        mist: {
            today: "bg-mist/20",
            navButton: "hover:bg-mist/40",
        },
        moss: {
            today: "bg-moss/20",
            navButton: "hover:bg-moss/40",
        },
        pine: {
            today: "bg-pine/20",
            navButton: "hover:bg-pine/40",
        },
    };

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className,
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "short" }),
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn(
                    "flex gap-4 flex-col md:flex-row relative",
                    defaultClassNames.months,
                ),
                month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
                nav: cn(
                    "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
                    classes[color].navButton,
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
                    classes[color].navButton,
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
                    defaultClassNames.month_caption,
                ),
                dropdowns: cn(
                    "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
                    defaultClassNames.dropdowns,
                ),
                dropdown_root: cn(
                    "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
                    defaultClassNames.dropdown_root,
                ),
                dropdown: cn(
                    "absolute bg-popover inset-0 opacity-0",
                    defaultClassNames.dropdown,
                ),
                caption_label: cn(
                    "select-none font-medium",
                    captionLayout === "label"
                        ? "text-sm"
                        : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
                    defaultClassNames.caption_label,
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex", defaultClassNames.weekdays),
                weekday: cn(
                    "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
                    defaultClassNames.weekday,
                ),
                week: cn("flex w-full mt-2", defaultClassNames.week),
                week_number_header: cn(
                    "select-none w-(--cell-size)",
                    defaultClassNames.week_number_header,
                ),
                week_number: cn(
                    "text-[0.8rem] select-none text-muted-foreground",
                    defaultClassNames.week_number,
                ),
                day: cn(
                    "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none rounded-md",
                    props.showWeekNumber
                        ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
                        : "[&:first-child[data-selected=true]_button]:rounded-l-md",
                    defaultClassNames.day,
                ),
                range_start: cn("rounded-l-md", defaultClassNames.range_start),
                range_middle: cn("rounded-none", defaultClassNames.range_middle),
                range_end: cn("rounded-r-md", defaultClassNames.range_end),
                today: cn(
                    "rounded-md data-[selected=true]:rounded-none",
                    classes[color].today,
                    defaultClassNames.today,
                ),
                outside: cn(
                    "text-muted-foreground aria-selected:text-muted-foreground",
                    defaultClassNames.outside,
                ),
                disabled: cn(
                    "text-muted-foreground opacity-50",
                    defaultClassNames.disabled,
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return (
                        <div
                            data-slot="calendar"
                            ref={rootRef}
                            className={cn(className)}
                            {...props}
                        />
                    );
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return (
                            <ChevronLeftIcon className={cn("size-4", className)} {...props} />
                        );
                    }

                    if (orientation === "right") {
                        return (
                            <ChevronRightIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        );
                    }

                    return (
                        <ChevronDownIcon className={cn("size-4", className)} {...props} />
                    );
                },
                DayButton: (p) => <CalendarDayButton {...p} color={color} />,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="flex size-(--cell-size) items-center justify-center text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    color,
    ...props
}: React.ComponentProps<typeof DayButton> & { color: ThemeColor }) {
    const defaultClassNames = getDefaultClassNames();

    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    const themeColorClasses: { [K in ThemeColor]: string } = {
        matcha:
            "data-[selected-single=true]:bg-matcha data-[selected-single=true]:text-dust data-[range-start=true]:bg-matcha/20 data-[range-middle=true]:bg-matcha/20 data-[range-middle=true]:text-matcha hover:bg-matcha/40",
        cream:
            "data-[selected-single=true]:bg-cream data-[selected-single=true]:text-dust data-[range-start=true]:bg-cream/20 data-[range-middle=true]:bg-cream/20 data-[range-middle=true]:text-cream hover:bg-cream/40",
        fog: "data-[selected-single=true]:bg-fog data-[selected-single=true]:text-dust data-[range-start=true]:bg-fog/20 data-[range-middle=true]:bg-fog/20 data-[range-middle=true]:text-dust hover:bg-fog/40",
        mist: "data-[selected-single=true]:bg-mist data-[selected-single=true]:text-fog data-[range-start=true]:bg-mist/20 data-[range-middle=true]:bg-mist/20 data-[range-middle=true]:text-fog hover:bg-mist/40",
        dust: "data-[selected-single=true]:bg-dust data-[selected-single=true]:text-fog data-[range-start=true]:bg-dust/20 data-[range-middle=true]:bg-dust/20 data-[range-middle=true]:text-dust hover:bg-dust/40",
        moss: "data-[selected-single=true]:bg-moss data-[selected-single=true]:text-fog data-[range-start=true]:bg-moss/20 data-[range-middle=true]:bg-moss/20 data-[range-middle=true]:text-moss hover:bg-moss/40",
        pine: "data-[selected-single=true]:bg-pine data-[selected-single=true]:text-fog data-[range-start=true]:bg-pine/20 data-[range-middle=true]:bg-pine/20 data-[range-middle=true]:text-pine hover:bg-pine/40",
    };

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "data-[range-start=true]:text-dust data-[range-end=true]:bg-cream data-[range-end=true]:text-dust group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
                defaultClassNames.day,
                themeColorClasses[color],
                className,
            )}
            {...props}
        />
    );
}

export { Calendar, CalendarDayButton };
