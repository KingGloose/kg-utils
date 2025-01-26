import { formatDateByTemplate } from "../date";

describe("formatDateByTemplate 函数测试", () => {
  test("使用时间戳时应该正确格式化", () => {
    // 2024-03-15 10:20:30
    const timestamp = 1710493230;
    expect(formatDateByTemplate(timestamp, "yyyy")).toBe("2024");
    expect(formatDateByTemplate(timestamp, "yy")).toBe("24");
    expect(formatDateByTemplate(timestamp, "mm")).toBe("03");
    expect(formatDateByTemplate(timestamp, "dd")).toBe("15");
    expect(formatDateByTemplate(timestamp, "hh")).toBe("17");
    expect(formatDateByTemplate(timestamp, "nn")).toBe("00");
    expect(formatDateByTemplate(timestamp, "ss")).toBe("30");
    expect(formatDateByTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-15 17:00:30");
    expect(formatDateByTemplate(timestamp, "dd/mm/yyyy")).toBe("15/03/2024");
    expect(formatDateByTemplate(timestamp, "yyyy年mm月dd日")).toBe("2024年03月15日");
    expect(formatDateByTemplate(timestamp, "yyyy.mm.dd hh:nn")).toBe("2024.03.15 17:00");
    expect(formatDateByTemplate(timestamp, "hh时nn分ss秒")).toBe("17时00分30秒");
    expect(formatDateByTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-15 17:00:30");
    expect(formatDateByTemplate(timestamp, "yyyy年mm月dd日 hh时nn分ss秒")).toBe("2024年03月15日 17时00分30秒");
  });
});
