/**
 * 格式化时间
 *
 * @param time - 时间戳（单位：秒）或字符串 "now" 表示当前时间，默认值为 "now"。
 * @param format - 格式化模板，支持：yyyy, yy, mm, m, dd, d, hh, h, nn, n, ss, s。例如：'yyyy-mm-dd hh:nn:ss'。
 *
 * @returns {string} 格式化后的时间字符串。
 *
 * @example
 * formatDateTemplate(1634172800, "yyyy-mm-dd hh:nn:ss"); // "2021-10-14 00:00:00"
 * formatDateTemplate("now", "dd/mm/yyyy"); // "14/10/2021"
 */
export function formatDateTemplate(time: number | "now" = "now", format: string = "yyyy-mm-dd hh:nn:ss"): string {
  const _date = time === "now" ? new Date() : new Date(time * 1000);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const hour = _date.getHours();
  const minute = _date.getMinutes();
  const second = _date.getSeconds();

  const formatTime = (num: number): string => (num < 10 ? "0" + num : num.toString());

  // 将各个时间部分的值封装到对象中
  const dateMap: { [key: string]: string | number } = {
    yyyy: year,
    yy: year % 100,
    mm: formatTime(month),
    m: month,
    dd: formatTime(day),
    d: day,
    hh: formatTime(hour),
    h: hour,
    nn: formatTime(minute),
    n: minute,
    ss: formatTime(second),
    s: second,
  };

  // 通过正则替换模板中的占位符
  return format.replace(/(yyyy|yy|mm|m|dd|d|hh|h|nn|n|ss|s)/g, (match) => {
    return dateMap[match].toString();
  });
}

/**
 * 将时间戳格式化为"xxx前"的形式
 * @param updateTimeStamp - 要格式化的时间戳（毫秒）
 * @returns 格式化后的时间字符串
 */
export function formatDateSection(previousTime: number, baseTime: number = Date.now()): string {
  const timeDiffInSeconds = Math.floor((baseTime - previousTime) / 1000);

  if (timeDiffInSeconds < 0) return "现在";

  // 定义时间区间 - 最高支持3月前 - 3个月 = 90天 = 7776000秒
  const timeRanges = [
    { max: 60, unit: "秒" },
    { max: 3600, unit: "分钟", divider: 60 },
    { max: 86400, unit: "小时", divider: 3600 },
    { max: 2592000, unit: "天", divider: 86400 },
    { max: 7776000, unit: "月", divider: 2592000 },
  ];

  for (const range of timeRanges) {
    if (timeDiffInSeconds < range.max) {
      const value = range.divider ? Math.floor(timeDiffInSeconds / range.divider) : timeDiffInSeconds;
      return `${value}${range.unit}前`;
    }
  }

  return "很久以前";
}
