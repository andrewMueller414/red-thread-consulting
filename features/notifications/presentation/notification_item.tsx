"use client";
import React, { useEffect, type ReactNode } from "react";
import { NotificationItem } from "../state/notifications_state";
import { useDispatch } from "react-redux";
import { removeNotificationById } from "../state/notifications_slice";

interface NotificationItemComponentProps {
    item: NotificationItem;
}

export const NotificationItemComponent = ({
    item,
}: NotificationItemComponentProps): ReactNode => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(removeNotificationById(item.id));
        }, item.duration);
    }, [item.id, item.duration, dispatch]);
    return (
        <div key={item.id} className="w-full rounded bg-dust text-fog px-3 py-2">
            <div className="font-bellefair">{item.title}</div>
            <div className="text-sm text-fog indent-2">{item.message}</div>
        </div>
    );
};

NotificationItemComponent.displayName = "NotificationItemComponent";
