import { Component, h } from "zheleznaya";

type PathResolutionStrategy = (path?: string) => string;
export function PathStrategy(path?: string) {
  return path ?? location.pathname;
}
export function HashStrategy(path?: string) {
  return path ? `#${path}` : location.hash.replace("#", "");
}

export function match(realPath: string[], definedPath: string[]): boolean {
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

export function extractPathParam(realPath: string[], definedPath: string[]) {
  const result: Record<string, string> = {};
  for (let i = 0; i < definedPath.length; i++) {
    if (definedPath[i].startsWith(":")) {
      result[definedPath[i].slice(1)] = realPath[i];
    }
  }
  return result;
}

export function createRouter(store: { path: string }, strategy: PathResolutionStrategy = PathStrategy) {
  const Router: Component<{
    routes: Record<Path, Component>;
    error?: Component;
  }> = ({ routes, error }) => {
    const path = strategy().trim().split("/").filter(Boolean);

    const [url, Page] = Object.entries(routes)
      .map(([url, Page]) => [url.trim().split("/").filter(Boolean), Page] as const)
      .find(([url]) => match(path, url))
      ?? [[], error ?? (() => <h2>404 Not found</h2>)];

      const pathParam = extractPathParam(path, url);
    return Page(pathParam, []);
  }

  const Link: Component<{ href: string }> = ({ href: _href }, children) => {
    return <a href={_href} onclick={() => (href(_href), false)}>{children}</a>
  }

  const callbacks: Array<() => void> = [];
  function onRouteChange(cb: () => void) {
    callbacks.push(cb);
  }

  function href(path?: string) {
    const _path = strategy(path)
    store.path = _path;
    history.pushState(_path, "", _path);
    callbacks.forEach(it => it());
  }

  function replace(path: string) {
    const _path = strategy(path)
    store.path = _path;
    history.replaceState(_path, "", _path);
    callbacks.forEach(it => it());
  }

  window.onpopstate = () => {
    const _path = strategy()
    store.path = _path;
    callbacks.forEach(it => it());
  }

  return { Router, onRouteChange, href, replace, Link };
}

type PathParamItem = `:${string}`
type PathItem = string | PathParamItem;
type InnerPath = `${PathItem}` | `${PathItem}/${PathItem}`;
type Path =
  `/` |
  `/${InnerPath}`;
