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
        setEditorSaveSuccessOpen(state, action: PayloadAction<boolean>) {
            state.showSavedEditorIndicator = action.payload;
        },
        setEditorMdxIdModalOpen(state, action: PayloadAction<boolean>) {
            state.mdxIdModalOpen = action.payload;
        },
    },
});

export const {
    setDrawerOpen,
    setEditorSaveSuccessOpen,
    setEditorMdxIdModalOpen,
} = slice.actions;
export default slice.reducer;
