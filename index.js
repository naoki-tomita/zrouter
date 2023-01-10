"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Router = exports.findRoute = exports.getParams = exports.useLocation = exports.init = void 0;
const zheleznaya_1 = require("zheleznaya");
const locationState = {
    get path() {
        return _state.__path__;
    },
    params: {},
    href(path) {
        history.pushState(path, "", path);
        _state.__path__ = path;
    }
};
let _state;
function init(store) {
    _state = store;
    _state.__path__ = location.pathname;
    window.onpopstate = () => {
        _state.__path__ = location.pathname;
    };
}
exports.init = init;
function useLocation() {
    return locationState;
}
exports.useLocation = useLocation;
function getParams(route, path) {
    const routeArr = route.split("/");
    const pathArr = path.split("/");
    return routeArr.reduce((prev, key, i) => {
        if (key.startsWith(":")) {
            const val = pathArr[i];
            return Object.assign(Object.assign({}, prev), { [key.replace(":", "")]: val });
        }
        return prev;
    }, {});
}
exports.getParams = getParams;
function findRoute(routes, path) {
    const pathArr = path.split("/");
    return routes.find(([path]) => {
        const routeArr = path.split("/");
        if (routeArr.length !== pathArr.length) {
            return false;
        }
        for (let i = 0; i < pathArr.length; i++) {
            if (pathArr[i] === routeArr[i]) {
                continue;
            }
            else if (routeArr[i].startsWith(":")) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    });
}
exports.findRoute = findRoute;
function setLocationState() {
}
const Router = ({ routes, error }) => {
    var _a;
    const [route, El] = (_a = findRoute(routes, locationState.path)) !== null && _a !== void 0 ? _a : [];
    if (route) {
        locationState.params = getParams(route, locationState.path);
    }
    return ((0, zheleznaya_1.h)("div", null, El
        ? El
        : error
            ? error
            : (0, zheleznaya_1.h)("div", null, "404 Not Found")));
};
exports.Router = Router;
const Link = ({ href }, children) => {
    return (0, zheleznaya_1.h)("a", { href: href, onclick: () => {
            locationState.href(href);
            return false;
        } }, children);
};
exports.Link = Link;
//# sourceMappingURL=index.js.map