import isPromise from "../../is/isPromise";

describe("isPromise 函数测试", () => {
  test("Promise 对象应该返回 true", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
    expect(isPromise(Promise.reject().catch(() => {}))).toBe(true);
  });

  test("类 Promise 对象（具有 then 方法）应该返回 true", () => {
    const thenable = { then: () => {} };
    expect(isPromise(thenable)).toBe(true);
  });

  test("非 Promise 对象应该返回 false", () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise(() => {})).toBe(false);
    expect(isPromise({ then: "not a function" })).toBe(false);
  });
});
