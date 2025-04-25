import { describe, expect, test } from "bun:test";
import { normalizePathStart } from "./normalize-path-start";

describe(normalizePathStart.name, () => {
  test("simple relative path", () => {
    const dir = "foo";
    const path = "foo/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("dot-prefixed relative path", () => {
    const dir = "./foo";
    const path = "./foo/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("absolute path using forward slashes", () => {
    const dir = "D:/foo";
    const path = "D:/foo/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("absolute path using backslashes", () => {
    const dir = "D:\\foo";
    const path = "D:\\foo\\bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("path is exactly the directory", () => {
    const dir = "foo";
    const path = "foo";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("");
  });

  test("path does not start with the directory", () => {
    const dir = "foo";
    const path = "bar/foo";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar/foo");
  });

  test("directory with trailing slash", () => {
    const dir = "foo/";
    const path = "foo/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("path with trailing slash", () => {
    const dir = "foo";
    const path = "foo/bar/";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("directory and path with mixed slashes", () => {
    const dir = "foo/";
    const path = "foo\\bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar");
  });

  test("path is a subdirectory of the directory", () => {
    const dir = "foo";
    const path = "foo/bar/baz";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("bar/baz");
  });

  test("directory is a prefix but not a parent directory", () => {
    const dir = "foo";
    const path = "foobar/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("foobar/bar");
  });

  test("empty directory", () => {
    const dir = "";
    const path = "foo/bar";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("foo/bar");
  });

  test("empty path", () => {
    const dir = "foo";
    const path = "";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("");
  });

  test("both directory and path are empty", () => {
    const dir = "";
    const path = "";
    const result = normalizePathStart(dir, path);
    expect(result).toBe("");
  });
});
