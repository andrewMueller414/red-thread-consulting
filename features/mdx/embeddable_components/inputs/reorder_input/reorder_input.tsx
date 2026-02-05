import { LayoutGroup, Reorder } from "framer-motion";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { ReorderItem } from "./reorder_item";
import { H2 } from "../../../../../core/shared_components/typography";
import {
    InputId,
    MdxFormData,
    PreviewComponentProps,
    ReorderMeta,
} from "../../../data/schemas/mdx_form_response";
import { useFormInitialValue } from "../../../state/hooks/use_form_initial_value";
import {
    ReorderInputProps,
    reorderInputProps,
    ReorderInputItem,
} from "../../../data/schemas/input_props_schemas";
import { cn } from "@/lib/utils";

export const ReorderInput = (
    props: ReorderInputProps & {
        disabled?: boolean;
        classes?: {
            container?: string;
            group?: string;
            item?: string;
        };
    } & PreviewComponentProps<ReorderInputItem[], ReorderMeta>,
): ReactNode => {
    const { options, ..._props } = props.meta ?? reorderInputProps.parse(props);
    const { title, subtitle, name } = _props;
    const form = useFormContext<MdxFormData>();
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [items, setItems] = useState<ReorderInputItem[]>(options);
    const updateStateHack = useRef(JSON.stringify(items));
    useFormInitialValue<ReorderMeta>(
        name,
        InputId.reorder,
        items.map((n) => n.value as string),
        {
            options: items,
            ..._props,
        },
    );
    const handleReorder = (newOrder: ReorderInputItem[]): void => {
        const s = JSON.stringify(newOrder);
        if (s !== updateStateHack.current) {
            setItems(newOrder);
            updateStateHack.current = s;
        }
    };

    useEffect(() => {
        // Necessary to smooth out animations by avoiding full re-render re-ordering.
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            form.setValue(name, {
                value: items.map((item) => item.value) as string[],
                inputId: InputId.reorder,
                meta: {
                    options: items,
                    ..._props,
                } satisfies ReorderMeta,
            });
        }, 500);
    }, [items]);

    return (
        <div
            className={cn(
                "w-full flex flex-col justify-start items-center py-6",
                props?.classes?.container,
            )}
        >
            {title ? <H2 className="mb-1">{title}</H2> : null}
            {subtitle ? (
                <div className="font-pine font-mono text-sm w-full indent-4">
                    {subtitle}
                </div>
            ) : null}
            <LayoutGroup>
                <Reorder.Group
                    /* @ts-expect-error -- This className property works, but it doesn't show up in the types for some reason. */
                    className={cn(
                        "w-full mt-2 flex flex-col justify-start items-start select-none",
                        props?.classes?.group,
                    )}
                    values={items}
                    onReorder={handleReorder}
                >
                    {items.map((item) => {
                        return (
                            <ReorderItem
                                key={`${item.title}${item.value}`}
                                item={item}
                                disabled={props.disabled}
                                className={props?.classes?.item}
                            />
                        );
                    })}
                </Reorder.Group>
            </LayoutGroup>
        </div>
    );
};

ReorderInput.displayName = "ReorderInput";
