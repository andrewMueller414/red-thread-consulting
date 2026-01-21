"use client";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./initial_state";

const store = configureStore({
    reducer: rootReducer,
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
