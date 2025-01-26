import { isObject } from "../is";

describe("isObject 函数测试", () => {
  test("基本类型应该返回 false", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol())).toBe(false);
  });

  test("纯对象应该返回 true", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
  });

  test("非纯对象在 isPlain 为 false 时应该返回 true", () => {
    expect(isObject([], false)).toBe(true);
    expect(isObject(new Date(), false)).toBe(true);
    expect(isObject(new Map(), false)).toBe(true);
    expect(isObject(new Set(), false)).toBe(true);
  });

  test("非纯对象在 isPlain 为 true 时应该返回 false", () => {
    expect(isObject([])).toBe(false);
    expect(isObject(new Date())).toBe(false);
    expect(isObject(new Map())).toBe(false);
    expect(isObject(new Set())).toBe(false);
  });
}); 