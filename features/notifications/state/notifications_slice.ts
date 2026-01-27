import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialNotificationState } from "./initial_notifications_state";
import { NotificationItem } from "./notifications_state";

const slice = createSlice({
    name: "notifications",
    initialState: initialNotificationState,
    reducers: {
        showNotification(state, action: PayloadAction<NotificationItem>) {
            state.notifications = [...state.notifications, action.payload];
        },
        removeNotificationById(state, action: PayloadAction<string>) {
            state.notifications = state.notifications.filter(
                (f) => f.id !== action.payload,
            );
        },
    },
});

export const { showNotification, removeNotificationById } = slice.actions;
export default slice.reducer;
