/**
 * 将时间戳格式化为"xxx前"的形式
 * @param updateTimeStamp - 要格式化的时间戳（毫秒）
 * @returns 格式化后的时间字符串
 */
function formatDateSection(previousTime: number, baseTime: number = Date.now()): string {
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

export default formatDateSection;
