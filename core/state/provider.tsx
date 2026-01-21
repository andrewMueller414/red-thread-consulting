"use client";
import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = (props: GlobalProviderProps): ReactNode => {
    return <Provider store={store}>{props.children}</Provider>;
};

GlobalProvider.displayName = "GlobalProvider";
