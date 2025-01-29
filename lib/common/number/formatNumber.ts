/**
 * 数字单位配置
 */
export const NUMBER_UNITS = {
  zh: {
    thousand: "千",
    tenThousand: "万",
    hundredMillion: "亿",
    trillion: "兆",
  },
  en: {
    thousand: "k",
    tenThousand: "w",
    hundredMillion: "b",
    trillion: "t",
  },
};

type Language = keyof typeof NUMBER_UNITS;

interface FormatNumberOptions {
  language?: Language; // 语言
  decimals?: number; // 小数点位数
  useGrouping?: boolean; // 是否使用千分位分隔符
  keepDecimals?: boolean; // 是否保留小数点后的0
}

/**
 * 格式化数字
 *
 * @param num - 要格式化的数字
 * @param options - 格式化选项
 *
 * @example
 * ```typescript
 * formatNumber(1234567)  // "123.46万"
 * formatNumber(1234567, { language: 'en' })  // "123.46w"
 * formatNumber(1234.567, { decimals: 2, useGrouping: true })  // "1,234.57"
 * formatNumber(1234567, { decimals: 1, language: 'zh' })  // "123.5万"
 * ```
 */
function formatNumber(num: number | string, options: FormatNumberOptions = {}): string {
  const { language = "zh", decimals = 2, useGrouping = false, keepDecimals = false } = options;

  const units = NUMBER_UNITS[language];
  const absNum = Math.abs(Number(num));
  const sign = Number(num) < 0 ? "-" : "";

  // 格式化小数点后的数字
  const formatDecimals = (value: number): string => {
    const multiplier = Math.pow(10, decimals);
    const roundedNum = Math.round(value * multiplier) / multiplier;
    if (!keepDecimals) {
      return roundedNum.toString();
    }
    return roundedNum.toFixed(decimals);
  };

  // 添加千分位分隔符
  const addGroupingSeparator = (numStr: string): string => {
    if (!useGrouping) return numStr;
    const parts = numStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // 根据数值大小选择不同的格式化方式
  if (absNum >= 1e12) {
    return sign + formatDecimals(absNum / 1e12) + units.trillion;
  } else if (absNum >= 1e8) {
    return sign + formatDecimals(absNum / 1e8) + units.hundredMillion;
  } else if (absNum >= 1e4) {
    return sign + formatDecimals(absNum / 1e4) + units.tenThousand;
  } else if (absNum >= 1e3) {
    return sign + formatDecimals(absNum / 1e3) + units.thousand;
  } else {
    return sign + addGroupingSeparator(formatDecimals(absNum));
  }
}

export default formatNumber;
