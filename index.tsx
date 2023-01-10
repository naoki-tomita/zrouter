import { Component, h } from "zheleznaya";
export interface LocationState {
  path: string;
  params: {
    [key: string]: string;
  };
  href(url: string): void;
}

const locationState: LocationState = {
  get path() {
    return _state.__path__
  },
  params: {},
  href(path: string) {
    history.pushState(path, "", path);
    _state.__path__ = path;
  }
}

let _state: { __path__: string };
export function init(store: any) {
  _state = store;
  _state.__path__ = location.pathname;
  window.onpopstate = () => {
    _state.__path__ = location.pathname;
  }
}

export function useLocation(): LocationState {
  return locationState;
}

export function getParams(route: string, path: string): { [key: string]: string } {
  const routeArr = route.split("/");
  const pathArr = path.split("/");
  return routeArr.reduce((prev, key, i) => {
    if (key.startsWith(":")) {
      const val = pathArr[i];
      return { ...prev, [key.replace(":", "")]: val };
    }
    return prev;
  }, {});
}

export function findRoute(routes: Route[], path: string): Route | undefined {
  const pathArr = path.split("/");
  return routes.find(([path]) => {
    const routeArr = path.split("/");
    if (routeArr.length !== pathArr.length) {
      return false;
    }
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i] === routeArr[i]) {
        continue;
      } else if (routeArr[i].startsWith(":")) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  });
}

function setLocationState() {
}

export type Route = [string, Component]
export const Router: Component<{
  routes: Route[];
  error?: Component<{ error: Error }>;
}> = ({ routes, error }) => {
  const [route, El] = findRoute(routes, locationState.path) ?? [];
  if (route) {
    locationState.params = getParams(route, locationState.path);
  }
  return (
    <div>
      {El
        ? El
        : error
          ? error
          : <div>404 Not Found</div> }
    </div>
  );
}

export const Link: Component<{ href: string }> = ({ href }, children) => {
  return <a href={href} onclick={() => {
    locationState.href(href)
    return false;
  } }>{children}</a>
}
