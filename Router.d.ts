import { Component } from "zheleznaya";
type PathResolutionStrategy = (path?: string) => string;
export declare function PathStrategy(path?: string): string;
export declare function HashStrategy(path?: string): string;
export declare function match(realPath: string[], definedPath: string[]): boolean;
export declare function extractPathParam(realPath: string[], definedPath: string[]): Record<string, string>;
export declare function createRouter(store: {
    path: string;
}, strategy?: PathResolutionStrategy): {
    Router: Component<{
        routes: Record<Path, Component>;
        error?: Component | undefined;
    }>;
    onRouteChange: (cb: () => void) => void;
    href: (path?: string) => void;
    Link: Component<{
        href: string;
    }>;
};
type PathParamItem = `:${string}`;
type PathItem = string | PathParamItem;
type InnerPath = `${PathItem}` | `${PathItem}/${PathItem}`;
type Path = `/` | `/${InnerPath}`;
export {};
//# sourceMappingURL=Router.d.ts.map