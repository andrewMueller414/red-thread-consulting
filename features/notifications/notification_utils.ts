import store from "@/core/state/store";
import { NotificationItem } from "./state/notifications_state";
import { v4 } from "uuid";
import { showNotification as showNotificationAction } from "./state/notifications_slice";

export const showNotification = (data: Omit<NotificationItem, "id">) => {
    store.dispatch(
        showNotificationAction({
            ...data,
            id: v4(),
        }),
    );
};
