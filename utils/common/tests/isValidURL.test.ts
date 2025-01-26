import { isValidURL } from "../is";

describe("isValidURL 函数测试", () => {
  test("有效的 URL 应该返回 true", () => {
    expect(isValidURL("https://www.example.com")).toBe(true);
    expect(isValidURL("http://localhost:3000")).toBe(true);
    expect(isValidURL("https://sub.example.com/path?query=123#hash")).toBe(true);
    expect(isValidURL("ftp://ftp.example.com")).toBe(true);
    expect(isValidURL("http:/example.com")).toBe(true);
  });

  test("无效的 URL 应该返回 false", () => {
    expect(isValidURL("not-a-url")).toBe(false);
    expect(isValidURL("https://")).toBe(false);
    expect(isValidURL("")).toBe(false);
  });
});
