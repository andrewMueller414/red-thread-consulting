import React, { type ReactNode } from "react";
import { MdxFormWrapper } from "../../../../features/mdx/presentation/mdx_form_container";

interface FormResponseLayoutProps {
    children: ReactNode;
}

const FormResponseLayout = ({
    children,
}: FormResponseLayoutProps): ReactNode => {
    return <MdxFormWrapper>{children}</MdxFormWrapper>;
};

FormResponseLayout.displayName = "FormResponseLayout";

export default FormResponseLayout;
