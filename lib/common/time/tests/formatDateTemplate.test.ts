import formatDateTemplate from "../formatDateTemplate";

describe("formatDateTemplate 函数测试", () => {
  test("使用时间戳时应该正确格式化", () => {
    // 2024-03-15 10:20:30
    const timestamp = 1710493230;
    expect(formatDateTemplate(timestamp, "yyyy")).toBe("2024");
    expect(formatDateTemplate(timestamp, "yy")).toBe("24");
    expect(formatDateTemplate(timestamp, "mm")).toBe("03");
    expect(formatDateTemplate(timestamp, "dd")).toBe("15");
    expect(formatDateTemplate(timestamp, "hh")).toBe("17");
    expect(formatDateTemplate(timestamp, "nn")).toBe("00");
    expect(formatDateTemplate(timestamp, "ss")).toBe("30");
    expect(formatDateTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-15 17:00:30");
    expect(formatDateTemplate(timestamp, "dd/mm/yyyy")).toBe("15/03/2024");
    expect(formatDateTemplate(timestamp, "yyyy年mm月dd日")).toBe("2024年03月15日");
    expect(formatDateTemplate(timestamp, "yyyy.mm.dd hh:nn")).toBe("2024.03.15 17:00");
    expect(formatDateTemplate(timestamp, "hh时nn分ss秒")).toBe("17时00分30秒");
    expect(formatDateTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-15 17:00:30");
    expect(formatDateTemplate(timestamp, "yyyy年mm月dd日 hh时nn分ss秒")).toBe("2024年03月15日 17时00分30秒");
  });
});
