import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialNavState } from "./initial_nav_state";

const slice = createSlice({
    name: "nav",
    initialState: initialNavState,
    reducers: {
        setDrawerOpen(state, action: PayloadAction<boolean | "toggle">) {
            state.drawer = {
                ...state.drawer,
                open: action.payload === "toggle" ? !state.drawer.open : action.payload,
            };
        },
    },
});

export const { setDrawerOpen } = slice.actions;
export default slice.reducer;
