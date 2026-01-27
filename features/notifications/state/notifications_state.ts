export interface NotificationItem {
    id: string;
    message: string;
    title: string;
    duration: number;
    variant: "info";
}

export interface NotificationsState {
    notifications: NotificationItem[];
}
