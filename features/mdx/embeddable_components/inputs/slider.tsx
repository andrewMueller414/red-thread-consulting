import React, { type ReactNode } from "react";
import {
    EmbeddableSliderProps,
    sliderPropsSchema,
} from "../../data/schemas/input_props_schemas";
import { Slider } from "../../../../components/ui/slider";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";
import {
    InputId,
    MdxFormData,
    NestedFormValueOfType,
    PreviewComponentProps,
    SliderMeta,
} from "../../data/schemas/mdx_form_response";
import { cn } from "../../../../lib/utils";
import { SizeEnumWithFull } from "../media/image";
import { Label } from "../../../../components/ui/label";
import { useFormContext } from "react-hook-form";

export const EmbeddableSlider = (
    props: EmbeddableSliderProps & PreviewComponentProps<number>,
): ReactNode => {
    const { initial, step, max, min, label, name, vertical, width, showValue } =
        sliderPropsSchema.parse(props);
    useFormInitialValue<SliderMeta>(name, InputId.slider, initial, {
        vertical,
        initial,
        max,
        min,
        step,
        label,
        width,
        showValue,
    });
    const form = useFormContext<MdxFormData>();
    const widthMap: { [K in SizeEnumWithFull]: string } = {
        small: "@sm/mdx:w-45",
        medium: "@md/mdx:w-90",
        large: "@2xl/mdx:w-180",
        full: "",
    };
    const value = form.watch(name) as NestedFormValueOfType<number>;
    return (
        <div
            className={cn(
                "flex flex-col justify-start items-start h-fit max-w-full",
                widthMap[width],
            )}
        >
            {label ? <Label className="mb-2">{label}</Label> : null}
            <Slider
                min={min}
                max={max}
                step={step}
                disabled={props.disabled}
                onValueChange={(v) => {
                    if (v.length === 1) {
                        form.setValue(name, {
                            value: v[0],
                            inputId: InputId.slider,
                            meta: {
                                vertical,
                                initial,
                                max,
                                min,
                                step,
                                label,
                                width,
                                showValue,
                            },
                        });
                    }
                }}
                value={[props.valueOverride ?? value?.value ?? initial]}
            />
            {showValue && typeof value?.value === "number" ? (
                <div className="w-full mb-6 mt-0 text-right text-[12px] font-mono text-pine">
                    {value?.value}
                </div>
            ) : null}
        </div>
    );
};

EmbeddableSlider.displayName = "EmbeddableSlider";
