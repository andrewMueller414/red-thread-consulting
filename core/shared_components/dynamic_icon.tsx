import React, { ComponentProps } from "react";

import { DynamicIcon } from "lucide-react/dynamic";

const Icon = (props: ComponentProps<typeof DynamicIcon>) => {
    return <DynamicIcon {...props} />;
};

export default Icon;
