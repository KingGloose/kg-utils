import { formatDateByTemplate } from "../date";

describe("formatDateByTemplate 函数测试", () => {
  // 固定时间以便测试
  const mockDate = new Date("2024-03-15T08:30:45");
  let originalDate: DateConstructor;

  beforeAll(() => {
    originalDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  test("使用默认参数时应该正确格式化当前时间", () => {
    expect(formatDateByTemplate()).toBe("2024-03-15 08:30:45");
    expect(formatDateByTemplate("now")).toBe("2024-03-15 08:30:45");
  });

  test("使用时间戳时应该正确格式化", () => {
    // 2024-03-15 10:20:30
    const timestamp = 1710493230;
    expect(formatDateByTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-15 10:20:30");
  });

  test("应该正确处理所有格式化模板", () => {
    const timestamp = 1710493230; // 2024-03-15 10:20:30
    expect(formatDateByTemplate(timestamp, "yyyy")).toBe("2024");
    expect(formatDateByTemplate(timestamp, "yy")).toBe("24");
    expect(formatDateByTemplate(timestamp, "mm")).toBe("03");
    expect(formatDateByTemplate(timestamp, "m")).toBe("3");
    expect(formatDateByTemplate(timestamp, "dd")).toBe("15");
    expect(formatDateByTemplate(timestamp, "d")).toBe("15");
    expect(formatDateByTemplate(timestamp, "hh")).toBe("10");
    expect(formatDateByTemplate(timestamp, "h")).toBe("10");
    expect(formatDateByTemplate(timestamp, "nn")).toBe("20");
    expect(formatDateByTemplate(timestamp, "n")).toBe("20");
    expect(formatDateByTemplate(timestamp, "ss")).toBe("30");
    expect(formatDateByTemplate(timestamp, "s")).toBe("30");
  });

  test("应该正确处理不同的日期格式", () => {
    const timestamp = 1710493230; // 2024-03-15 10:20:30
    expect(formatDateByTemplate(timestamp, "dd/mm/yyyy")).toBe("15/03/2024");
    expect(formatDateByTemplate(timestamp, "yyyy年mm月dd日")).toBe("2024年03月15日");
    expect(formatDateByTemplate(timestamp, "yyyy.mm.dd hh:nn")).toBe("2024.03.15 10:20");
    expect(formatDateByTemplate(timestamp, "h时n分s秒")).toBe("10时20分30秒");
  });

  test("应该正确处理个位数的时间值", () => {
    // 2024-03-05 05:05:05
    const timestamp = 1709611505;
    expect(formatDateByTemplate(timestamp, "yyyy-mm-dd hh:nn:ss")).toBe("2024-03-05 05:05:05");
    expect(formatDateByTemplate(timestamp, "m/d/yy h:n:s")).toBe("3/5/24 5:5:5");
  });

  test("应该正确处理复杂的格式模板", () => {
    const timestamp = 1710493230; // 2024-03-15 10:20:30
    expect(formatDateByTemplate(timestamp, "yyyy年mm月dd日 hh时nn分ss秒")).toBe(
      "2024年03月15日 10时20分30秒"
    );
    expect(formatDateByTemplate(timestamp, "yy/m/d h:n:s")).toBe("24/3/15 10:20:30");
  });
}); 