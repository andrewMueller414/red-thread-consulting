"use client";
import { PriorityId } from "@/lib/generated/prisma/enums";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { priorityIdLabelMap } from "./priority_id_label_map";
import {
    OnboardingFormType,
    PriorityItem,
} from "@/features/onboarding/onboarding_types";
import { PriorityIdReorderItem } from "./priority_reorder_item";
import { LayoutGroup, Reorder } from "framer-motion";

const formIdsToPriorityItems = (ids: PriorityId[]): PriorityItem[] => {
    return ids.map((n) => {
        return {
            value: n,
            label: priorityIdLabelMap[n],
        };
    });
};

export const PrioritiesReorderContainer = ({
    form,
}: {
    form: OnboardingFormType;
}): ReactNode => {
    const formPriorities = form.watch("priorities");
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [items, setItems] = useState<PriorityItem[]>(
        formIdsToPriorityItems(formPriorities),
    );
    const updateStateHack = useRef(JSON.stringify(items));

    const handleReorder = (newOrder: PriorityItem[]): void => {
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
                "priorities",
                items.map((item) => item.value),
            );
        }, 500);
        /* eslint-disable-next-line  -- Don't want to cause unecessary re-renders */
    }, [items]);
    return (
        <LayoutGroup>
            <Reorder.Group
                /* @ts-expect-error -- This className property works, but it doesn't show up in the types for some reason. */
                className="w-full pt-6 pb-8 flex flex-col justify-start items-start select-none"
                values={items}
                onReorder={handleReorder}
            >
                {items.map((priorityItem) => {
                    return (
                        <PriorityIdReorderItem
                            key={priorityItem.value}
                            item={priorityItem}
                        />
                    );
                })}
            </Reorder.Group>
        </LayoutGroup>
    );
};

PrioritiesReorderContainer.displayName = "PrioritiesReorderContainer";
