import { h } from "zheleznaya";
export function PathStrategy(path) {
    return path ?? location.pathname;
}
export function HashStrategy(path) {
    return path ? `#${path}` : location.hash.replace("#", "");
}
export function match(realPath, definedPath) {
    if (realPath.length !== definedPath.length) {
        return false;
    }
    for (let i = 0; i < definedPath.length; i++) {
        if (definedPath[i].startsWith(":")) {
            continue;
        }
        if (realPath[i] !== definedPath[i]) {
            return false;
        }
    }
    return true;
}
export function extractPathParam(realPath, definedPath) {
    const result = {};
    for (let i = 0; i < definedPath.length; i++) {
        if (definedPath[i].startsWith(":")) {
            result[definedPath[i].slice(1)] = realPath[i];
        }
    }
    return result;
}
export function createRouter(store, strategy = PathStrategy) {
    const Router = ({ routes, error }) => {
        const path = strategy().trim().split("/").filter(Boolean);
        const [url, Page] = Object.entries(routes)
            .map(([url, Page]) => [url.trim().split("/").filter(Boolean), Page])
            .find(([url]) => match(path, url))
            ?? [[], error ?? (() => h("h2", null, "404 Not found"))];
        const pathParam = extractPathParam(path, url);
        return Page(pathParam, []);
    };
    const Link = ({ href: _href }, children) => {
        return h("a", { href: _href, onclick: () => (href(_href), false) }, children);
    };
    const callbacks = [];
    function onRouteChange(cb) {
        callbacks.push(cb);
    }
    function href(path) {
        const _path = strategy(path);
        store.path = _path;
        history.pushState(_path, "", _path);
        callbacks.forEach(it => it());
    }
    window.onpopstate = () => {
        const _path = strategy();
        store.path = _path;
        callbacks.forEach(it => it());
    };
    return { Router, onRouteChange, href, Link };
}
//# sourceMappingURL=Router.js.map