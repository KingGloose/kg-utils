import isEmpty from "../is/isEmpty";

function HexToRgb(hexColor: string, alpha?: number) {
  hexColor = hexColor.replace("#", "");

  if (hexColor.length === 3 || hexColor.length === 4) {
    hexColor = hexColor
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // 针对透明度存在 #rgba/函数传输参数 的情况
  let finalAlpha;
  if (!isEmpty(alpha)) {
    finalAlpha = alpha!;
  } else if (hexColor.length === 8) {
    finalAlpha = (parseInt(hexColor.slice(6, 8), 16) / 255).toFixed(2);
  }
  return isEmpty(finalAlpha) ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${finalAlpha})`;
}

export default HexToRgb;
