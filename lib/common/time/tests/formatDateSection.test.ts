import formatDateSection from "../formatDateSection";

describe("formatDateSection 函数测试", () => {
  let now: number = Date.now();

  test("未来时间应该返回'现在'", () => {
    const futureTime = now + 1000;
    expect(formatDateSection(futureTime)).toBe("现在");
  });

  test("应该正确格式化秒数", () => {
    expect(formatDateSection(now - 30 * 1000)).toBe("30秒前");
    expect(formatDateSection(now - 59 * 1000)).toBe("59秒前");
  });

  test("应该正确格式化分钟", () => {
    expect(formatDateSection(now - 2 * 60 * 1000)).toBe("2分钟前");
    expect(formatDateSection(now - 59 * 60 * 1000)).toBe("59分钟前");
  });

  test("应该正确格式化小时", () => {
    expect(formatDateSection(now - 2 * 3600 * 1000)).toBe("2小时前");
    expect(formatDateSection(now - 23 * 3600 * 1000)).toBe("23小时前");
  });

  test("应该正确格式化天数", () => {
    expect(formatDateSection(now - 2 * 86400 * 1000)).toBe("2天前");
    expect(formatDateSection(now - 29 * 86400 * 1000)).toBe("29天前");
  });

  test("应该正确格式化月份", () => {
    expect(formatDateSection(now - 35 * 86400 * 1000)).toBe("1月前");
    expect(formatDateSection(now - 65 * 86400 * 1000)).toBe("2月前");
    expect(formatDateSection(now - 89 * 86400 * 1000)).toBe("2月前");
  });

  test("超过3个月应该返回'很久以前'", () => {
    expect(formatDateSection(now - 91 * 86400 * 1000)).toBe("很久以前");
    expect(formatDateSection(now - 365 * 86400 * 1000)).toBe("很久以前");
  });
});
