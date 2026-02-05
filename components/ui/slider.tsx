"use client";

import React, { ComponentProps, useMemo } from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { ThemeColor } from "../../features/mdx/embeddable_components/shared_schemas";

interface SliderClassGroup {
    range: string;
    root: string;
    track: string;
    thumb: string;
}

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    color = "pine",
    ...props
}: ComponentProps<typeof SliderPrimitive.Root> & { color?: ThemeColor }) {
    const _values = useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                    ? defaultValue
                    : [min, max],
        [value, defaultValue, min, max],
    );

    const classes: SliderClassGroup | undefined = useMemo(() => {
        if (!color) {
            return undefined;
        }
        switch (color) {
            case "dust": {
                return {
                    range: "bg-dust ",
                    root: "",
                    track: "bg-mist/30 ",
                    thumb: "border-dust ring-dust/50 bg-fog",
                };
            }
            case "moss": {
                return {
                    range: "bg-moss ",
                    root: "",
                    track: "bg-mist/30 ",
                    thumb: "border-moss ring-moss/50 bg-fog",
                };
            }
            case "pine": {
                return {
                    range: "bg-pine ",
                    root: "",
                    track: "bg-mist/30 ",
                    thumb: "border-pine ring-pine/50 bg-fog",
                };
            }
            case "mist": {
                return {
                    range: "bg-mist ",
                    root: "",
                    track: "bg-dust/20 ",
                    thumb: "border-mist ring-mist/50 bg-fog",
                };
            }
            case "fog": {
                return {
                    range: "bg-mist/20",
                    root: "",
                    track: "bg-mist/30",
                    thumb: "border-fog ring-fog/50 bg-dust",
                };
            }
            case "matcha": {
                return {
                    range: "bg-matcha ",
                    root: "",
                    track: "bg-mist/30 ",
                    thumb: "border-matcha ring-matcha/50 bg-dust",
                };
            }
            case "cream": {
                return {
                    range: "bg-cream border border-dust/10",
                    root: "",
                    track: "bg-mist/30 ",
                    thumb: "border-cream ring-cream/50 bg-dust",
                };
            }
        }
    }, [color]);

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                className,
                classes?.root,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                    classes?.track,
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                        classes?.range,
                    )}
                />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className={cn(
                        "block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
                        classes?.thumb,
                    )}
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { Slider };
