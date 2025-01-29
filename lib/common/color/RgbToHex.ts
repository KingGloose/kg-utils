import isEmpty from "../is/isEmpty";
import DecToHex from "../binary/decToHex";

function RgbToHex(rgbaColor: string, alpha?: number) {
  if (!rgbaColor) return "";
  const color = rgbaColor.trim().toLowerCase();

  // 判断输入颜色格式（RGBA 或 RGB）
  const isRgba = color.startsWith("rgba");
  const isRgb = color.startsWith("rgb");
  if (!isRgba && !isRgb) return color;

  const colorValues = color.substring(color.indexOf("(") + 1, color.lastIndexOf(")")).split(",");

  const red = parseInt(colorValues[0].trim());
  const green = parseInt(colorValues[1].trim());
  const blue = parseInt(colorValues[2].trim());

  const toHex = (n: number): string => DecToHex(n, { padding: 2 });
  let hex = "#" + toHex(red) + toHex(green) + toHex(blue);

  // 处理 alpha 值
  let finalAlpha;
  if (!isEmpty(alpha)) {
    finalAlpha = alpha!;
  } else if (isRgba && colorValues.length >= 4) {
    finalAlpha = parseFloat(colorValues[3].trim());
  }

  if (!isEmpty(finalAlpha)) {
    const alphaHex = toHex(Math.round(finalAlpha! * 255));
    hex += alphaHex;
  }

  return hex.toUpperCase();
}

export default RgbToHex;
