"use client";
import React, { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = (props: GlobalProviderProps): ReactNode => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSessionData = async (): Promise<void> => {
            const res = await getSession();
            setSession(res);
        };
        getSessionData();
    }, []);
    return (
        <Provider store={store}>
            <SessionProvider session={session}>{props.children}</SessionProvider>
        </Provider>
    );
};

GlobalProvider.displayName = "GlobalProvider";
