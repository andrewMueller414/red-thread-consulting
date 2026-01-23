"use client";
import { PriorityItem } from "@/features/onboarding/onboarding_types";
import React, { useState, type ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDragHandle = motion(GripVertical);

interface PriorityIdReorderItemProps {
    item: PriorityItem;
}

export const PriorityIdReorderItem = ({
    item,
}: PriorityIdReorderItemProps): ReactNode => {
    const controls = useDragControls();
    const [dragging, setDragging] = useState(false);
    return (
        <Reorder.Item
            className="text-xl font-bellefair border rounded px-4 py-3 bg-matcha w-full select-none touch-none flex flex-row justify-start items-center gap-x-4 overflow-clip"
            dragListener={false}
            dragControls={controls}
            value={item}
            whileDrag={{
                cursor: "grabbing",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                zIndex: 9999999,
                background: "var(--color-moss)",
                color: "var(--fog)",
            }}
            style={{
                willChange: "transform",
                background: "var(--matcha)",
                color: "var(--pine)",
            }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
        >
            <MotionDragHandle
                className={cn(
                    "cursor-grab select-none touch-none",
                    dragging ? "stroke-fog/40" : "stroke-pine/40",
                )}
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
