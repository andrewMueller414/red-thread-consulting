export interface MobileDrawerState {
    open: boolean;
}

export interface NavigationState {
    drawer: MobileDrawerState;
    showSavedEditorIndicator: boolean;
    mdxIdModalOpen: boolean;
}
