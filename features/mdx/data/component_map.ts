import { FC } from "react";
import { H1, H2, H3, H4 } from "../../../core/shared_components/typography";

/* eslint-disable-next-line  -- Need to use any here. */
export const getComponentMap = (_: string): Record<string, FC<any>> => {
  // TODO: Just returning all components for now. Come back here and implement a regex search to avoid sending back unecessary data.
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
  };
};
