import { HashStrategy, PathStrategy, extractPathParam, match, createRouter } from "../Router";

describe("HashStrategy", () => {
  it("should be get hash", () => {
    const actual = HashStrategy("/foo/bar");
    expect(actual).toBe("#/foo/bar");
  });
});

describe("PathStrategy", () => {
  it("should be get path", () => {
    const actual = PathStrategy("/foo/bar");
    expect(actual).toBe("/foo/bar");
  })
});

describe("match", () => {
  const tests = [
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", "bar", "hoge"],
      expected: true,
    },
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", ":id", "hoge"],
      expected: true,
    },
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", "hoge"],
      expected: false,
    },
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", "foo", "hoge"],
      expected: false,
    },
  ]
  it.each(tests)("should match path", ({ realPath, definedPath, expected }) => {
    expect(match(realPath, definedPath)).toBe(expected);
  });
});

describe("extractPathParam", () => {
  const tests = [
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", "bar", "hoge"],
      expected: {},
    },
    {
      realPath: ["foo", "bar", "hoge"],
      definedPath: ["foo", ":id", "hoge"],
      expected: {id: "bar"},
    }
  ]
  it.each(tests)("should extract path params", ({ realPath, definedPath, expected }) => {
    expect(extractPathParam(realPath, definedPath)).toEqual(expected);
  });
});
