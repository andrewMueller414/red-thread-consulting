"use client";
import React, { type ReactNode } from "react";
import { NotificationItem } from "../state/notifications_state";

import { connect } from "react-redux";
import { AppState } from "@/core/state/store";
import { NotificationItemComponent } from "./notification_item";

const connector = connect((state: AppState) => ({
    notifications: state.notifications.notifications,
}));

interface NotificationsContainerProps {
    notifications: NotificationItem[];
}

export const NotificationsContainer = connector(
    ({ notifications }: NotificationsContainerProps): ReactNode => {
        return (
            <div className="w-full max-w-87.5 fixed top-4 right-4 h-fit flex flex-col justify-start items-center max-h-screen z-50">
                {notifications.map((n) => {
                    return <NotificationItemComponent key={n.id} item={n} />;
                })}
            </div>
        );
    },
);

NotificationsContainer.displayName = "NotificationsContainer";
