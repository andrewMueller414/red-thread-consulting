"use client";
import { PriorityItem } from "@/features/onboarding/onboarding_types";
import React, { type ReactNode } from "react";
import { useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";

/* const MotionDragHandle = motion(GripVertical); */

interface PriorityIdReorderItemProps {
    item: PriorityItem;
}

export const PriorityIdReorderItem = ({
    item,
}: PriorityIdReorderItemProps): ReactNode => {
    const controls = useDragControls();
    return (
        <Reorder.Item
            className="text-xl font-bellefair border rounded px-4 py-3 bg-matcha w-full select-none touch-none flex flex-row justify-start items-center gap-x-4 overflow-clip"
            dragListener={false}
            dragControls={controls}
            value={item}
            whileDrag={{
                cursor: "grabbing",
                zIndex: 999,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            }}
            style={{
                willChange: "transform",
            }}
        >
            <GripVertical
                /* layout="position" */
                className="stroke-pine/60 cursor-grab select-none touch-none"
                onPointerDown={(e) => {
                    controls.start(e);
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            <div className="pointer-events-none">{item.label}</div>
        </Reorder.Item>
    );
};

PriorityIdReorderItem.displayName = "PriorityIdReorderItem";
