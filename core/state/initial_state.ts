"use client";
import NavigationReducer from "../../features/navigation/state/nav_state_reducer";
import NotificationsReducer from "../../features/notifications/state/notifications_slice";

export const rootReducer = {
    nav: NavigationReducer,
    notifications: NotificationsReducer,
};
