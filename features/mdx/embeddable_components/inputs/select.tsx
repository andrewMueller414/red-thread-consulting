import React, { type ReactNode } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import {
    SelectInputProps,
    selectInputPropsSchema,
} from "../../data/schemas/input_props_schemas";
import { cn } from "../../../../lib/utils";
import { SizeEnumWithFull } from "../media/image";
import { useFormContext } from "react-hook-form";
import {
    InputId,
    MdxFormData,
    NestedFormValueOfType,
    PreviewComponentProps,
    SelectMeta,
} from "../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../state/hooks/use_form_initial_value";
import { Label } from "../../../../components/ui/label";

export const SelectInput = ({
    valueOverride,
    disabled,
    ...props
}: SelectInputProps & PreviewComponentProps<string>): ReactNode => {
    const form = useFormContext<MdxFormData>();
    const { options, label, width, name, placeholder } =
        selectInputPropsSchema.parse(props);
    const sizes: { [K in SizeEnumWithFull]: string } = {
        small: "@sm/mdx:w-45",
        medium: "@md/mdx:w-45",
        large: "@2xl/mdx:w-60",
        full: "",
    };
    useFormInitialValue<SelectMeta>(name, InputId.select, options[0], {
        label,
        placeholder,
        width,
        options,
    });
    const data = form.watch(name) as
        | NestedFormValueOfType<string>
        | null
        | undefined;
    return (
        <div className="flex flex-col justify-start items-start h-fit">
            <Label className="mb-2">{label}</Label>
            <Select
                disabled={disabled}
                onValueChange={(val) => {
                    form.setValue(name, {
                        value: val,
                        inputId: InputId.select,
                        meta: {
                            label,
                            width,
                            options,
                            placeholder,
                        },
                    });
                }}
                value={valueOverride ?? data?.value ?? ""}
            >
                <SelectTrigger className={cn("w-full", sizes[width])}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-matcha">
                    <SelectGroup>
                        {options.map((value) => {
                            return (
                                <SelectItem
                                    key={value}
                                    value={value}
                                    className="hover:bg-cream transition-colors duration-300"
                                >
                                    {value}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

SelectInput.displayName = "SelectInput";
