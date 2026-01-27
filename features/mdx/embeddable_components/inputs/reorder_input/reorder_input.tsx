import { LayoutGroup, Reorder } from "framer-motion";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
    ReorderInputProps,
    reorderInputProps,
    ReorderInputItem,
} from "./reorder_types";
import { ReorderItem } from "./reorder_item";
import { H2 } from "../../../../../core/shared_components/typography";

export const ReorderInput = (props: ReorderInputProps): ReactNode => {
    const { options, title, subtitle, name } = reorderInputProps.parse(props);
    const form = useForm();
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [items, setItems] = useState<ReorderInputItem[]>(options);
    const updateStateHack = useRef(JSON.stringify(items));

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
            form.setValue(
                name,
                items.map((item) => item.value),
            );
        }, 500);
    }, [items]);

    return (
        <div className="w-full flex flex-col justify-start items-center py-6">
            {title ? <H2 className="mb-1">{title}</H2> : null}
            {subtitle ? (
                <div className="font-pine font-mono text-sm w-full indent-4">
                    {subtitle}
                </div>
            ) : null}
            <LayoutGroup>
                <Reorder.Group
                    /* @ts-expect-error -- This className property works, but it doesn't show up in the types for some reason. */
                    className="w-full flex flex-col justify-start items-start select-none"
                    values={items}
                    onReorder={handleReorder}
                >
                    {items.map((item) => {
                        return (
                            <ReorderItem key={`${item.title}${item.value}`} item={item} />
                        );
                    })}
                </Reorder.Group>
            </LayoutGroup>
        </div>
    );
};

ReorderInput.displayName = "ReorderInput";
