import { Component } from "zheleznaya";
export interface LocationState {
    path: string;
    params: {
        [key: string]: string;
    };
    href(url: string): void;
}
export declare function init(store: any): void;
export declare function useLocation(): LocationState;
export declare function getParams(route: string, path: string): {
    [key: string]: string;
};
export declare function findRoute(routes: Route[], path: string): Route | undefined;
export type Route = [string, Component];
export declare const Router: Component<{
    routes: Route[];
    error?: Component<{
        error: Error;
    }>;
}>;
export declare const Link: Component<{
    href: string;
}>;
//# sourceMappingURL=index.d.ts.map