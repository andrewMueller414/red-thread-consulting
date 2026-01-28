export interface DeleteMdxConfirmationModalState {
    /** The ids to be deleted. */
    ids: string[];
}

export const showMdxDeleteConfirmation = (
    data: DeleteMdxConfirmationModalState,
) => {
    window.dispatchEvent(
        new CustomEvent("show-delete-mdx-confirmation", {
            detail: data,
        }),
    );
};
