import jsonParse from "../jsonParse";

describe("jsonParse", () => {
  // 测试有效的 JSON 对象
  test("应该正确解析有效的 JSON 对象", () => {
    const jsonStr = '{"name": "张三", "age": 25}';
    const result = jsonParse<{ name: string; age: number }>(jsonStr);

    expect(result).toEqual({
      name: "张三",
      age: 25,
    });
  });

  // 测试有效的 JSON 数组
  test("应该正确解析有效的 JSON 数组", () => {
    const jsonStr = "[1, 2, 3]";
    const result = jsonParse<number[]>(jsonStr);

    expect(result).toEqual([1, 2, 3]);
  });

  // 测试普通字符串（非 JSON 格式）
  test("对于普通字符串应该直接返回原值", () => {
    const str = "hello world";
    const result = jsonParse(str);

    expect(result).toBe(str);
  });

  // 测试无效的 JSON 字符串
  test("对于格式错误的 JSON 字符串应该返回原值", () => {
    const invalidJson = '{name: "张三"}'; // 缺少引号的无效 JSON
    const result = jsonParse(invalidJson);

    expect(result).toBe(invalidJson);
  });

  // 测试空字符串
  test("对于空字符串应该返回空字符串", () => {
    const emptyStr = "";
    const result = jsonParse(emptyStr);

    expect(result).toBe(emptyStr);
  });

  // 测试特殊情况：看起来像 JSON 但实际无效
  test("对于看起来像 JSON 但实际无效的字符串应该返回原值", () => {
    const invalidJson = "{abc}";
    const result = jsonParse(invalidJson);

    expect(result).toBe(invalidJson);
  });

  // 测试嵌套的 JSON 对象
  test("应该正确解析嵌套的 JSON 对象", () => {
    const jsonStr = '{"user": {"name": "张三", "age": 25}, "active": true}';
    interface TestType {
      user: {
        name: string;
        age: number;
      };
      active: boolean;
    }
    const result = jsonParse<TestType>(jsonStr);

    expect(result).toEqual({
      user: {
        name: "张三",
        age: 25,
      },
      active: true,
    });
  });
});
