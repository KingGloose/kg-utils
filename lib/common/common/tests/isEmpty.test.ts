import { isEmpty } from "../is";

describe("isEmpty 函数测试", () => {
  test("null、undefined 和空字符串应该返回 true", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
  });

  test("非空值应该返回 false", () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty("hello")).toBe(false);
    expect(isEmpty([])).toBe(false);
    expect(isEmpty({})).toBe(false);
    expect(isEmpty(" ")).toBe(false);
  });
});
