/**
 * 将十进制数转换为指定位数的十六进制字符串
 * @param decimal 十进制数
 * @param options 配置选项（可选）
 * @returns 十六进制字符串
 */
function decToHex(
  decimal: number,
  options: {
    padding?: number; // 需要补零的位数
    prefix?: boolean; // 是否添加 0x 前缀
    upperCase?: boolean; // 是否转换为大写
  } = {}
): string {
  const { prefix = false, upperCase = true, padding } = options;

  let hex = decimal.toString(16);

  // 补零处理
  if (padding !== undefined && padding > 0) {
    hex = hex.padStart(padding, "0");
  }

  hex = upperCase ? hex.toUpperCase() : hex.toLowerCase(); // 大小写处理
  hex = prefix ? "0x" + hex : hex; // 添加符号和前缀

  return hex;
}

export default decToHex;
