import { h, Component } from "zheleznaya";
import { findRoute, Route, getParams } from "../index";

describe("#findRoute", () => {
  it("should be find simple route.", () => {
    const path = "/foo/bar";
    const Comp: Component = () => <div />;
    const routes: Route[] = [["/foo/bar", Comp]];
    const actual = findRoute(routes, path);

    expect(actual).toEqual(routes[0]);
  });

  it("should be find simple route but more nested.", () => {
    const path = "/foo/bar";
    const Comp: Component = () => <div />;
    const routes: Route[] = [["/foo/bar/hoge", Comp]];
    const actual = findRoute(routes, path);

    expect(actual).toEqual(undefined);
  });

  it("should be find route includes path parameter.", () => {
    const path = "/foo/bar";
    const Comp: Component = () => <div />;
    const routes: Route[] = [["/foo/:param", Comp]];
    const actual = findRoute(routes, path);

    expect(actual).toEqual(routes[0]);
  });

  it("should be find route. variation test1.", () => {
    const path = "/foo/bar/hoge";
    const Comp: Component = () => <div />;
    const routes: Route[] = [["/foo/:param/hoge", Comp]];
    const actual = findRoute(routes, path);

    expect(actual).toEqual(routes[0]);
  });

  it("should be find route. variation test1.", () => {
    const path = "/foo/bar/hoge";
    const Comp: Component = () => <div />;
    const routes: Route[] = [["/foo/bar", Comp]];
    const actual = findRoute(routes, path);

    expect(actual).toEqual(undefined);
  });
})

describe("#getParams", () => {
  const tests = [
    { path: "/foo/bar", route: "/foo/bar", expected: {} },
    { path: "/foo/bar", route: "/foo/:id", expected: {id: "bar"} },
    { path: "/foo/bar/hoge", route: "/foo/:id/:name", expected: {id: "bar", name: "hoge"} }
  ]

  it.each(tests)("should be get params", ({ path, route, expected }) => {
    expect(getParams(route, path)).toEqual(expected);
  });
});
