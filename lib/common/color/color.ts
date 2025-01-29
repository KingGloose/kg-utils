export function HexToRgba(hexColor: string, alpha: number = 1) {
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`; // 返回 RGBA 格式
}

export function RgbaToHex(rgbaColor: string) {
  if (!rgbaColor) return "";
  // 去除空格并转为小写
  rgbaColor = rgbaColor.trim().toLowerCase();

  // 判断输入颜色格式（RGBA 或 RGB）
  var isRgba = rgbaColor.startsWith("rgba");
  var isRgb = rgbaColor.startsWith("rgb");

  if (isRgba || isRgb) {
    // 提取颜色分量的值
    var colorValues = rgbaColor.substring(rgbaColor.indexOf("(") + 1, rgbaColor.lastIndexOf(")")).split(",");
    var red = parseInt(colorValues[0].trim());
    var green = parseInt(colorValues[1].trim());
    var blue = parseInt(colorValues[2].trim());
    var alpha = isRgba ? parseFloat(colorValues[3].trim()) : 1; // 默认为不透明

    // 将颜色分量转换为对应的 HEX 值
    var hex = "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1).toUpperCase();

    return hex;
  } else {
    return rgbaColor; // 不是 RGBA 或 RGB 格式的颜色，直接返回原始值
  }
}
