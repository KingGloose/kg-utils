import { isValidJSON } from "../is";

describe("isValidJSON 函数测试", () => {
  test("有效的 JSON 字符串应该返回解析后的值", () => {
    expect(isValidJSON('{"name":"test","age":25}')).toEqual({
      name: "test",
      age: 25,
    });
    expect(isValidJSON("[1,2,3]")).toEqual([1, 2, 3]);
    expect(isValidJSON('"string"')).toBe("string");
    expect(isValidJSON("123")).toBe(123);
    expect(isValidJSON("true")).toBe(true);
    expect(isValidJSON("null")).toBe(null);
  });

  test("无效的 JSON 字符串应该返回 false", () => {
    expect(isValidJSON("{name:test}")).toBe(false);
    expect(isValidJSON("undefined")).toBe(false);
    expect(isValidJSON("")).toBe(false);
    expect(isValidJSON("{'name':'test'")).toBe(false);
  });
}); 