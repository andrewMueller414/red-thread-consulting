import { Route } from "next";
import { URLSearchParams } from "url";

export const typedSearchParamRoute = (route: Route, sp: URLSearchParams) =>
    `${route}?${sp.toString()}` as Route;
