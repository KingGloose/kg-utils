import isSecureContext from "../is/isSecureContext";
import type { EyeDropperResult } from "../../../types/eyedropper";

/**
 * 使用浏览器原生 EyeDropper API 实现屏幕取色功能
 * @returns {Promise<{sRGBHex: string}>} 返回Promise，成功时返回包含十六进制颜色值的对象
 *                                      失败时返回 rejected Promise
 *
 * @description
 * 该函数需要在以下条件下使用：
 * 1. 浏览器支持 EyeDropper API
 * 2. 页面运行在安全上下文中（HTTPS 或 localhost）
 *
 * @example
 * try {
 *   const result = await captureColorDropper();
 *   console.log('选中的颜色:', result.sRGBHex); // 例如: '#FF0000'
 * } catch (error) {
 *   if (error === false) {
 *     console.log('浏览器不支持取色功能');
 *   } else {
 *     console.log('取色过程被取消或发生错误');
 *   }
 * }
 *
 * @throws {false} 当浏览器不支持 EyeDropper API 或不在安全上下文中时
 * @throws {Error} 当用户取消选择或发生其他错误时
 */
function captureColorDropper(): Promise<EyeDropperResult> {
  return new Promise((resolve, reject) => {
    if (window.EyeDropper && isSecureContext) {
      const eyeDropper = new window.EyeDropper();
      eyeDropper.open().then(resolve).catch(reject);
    } else {
      reject(false);
    }
  });
}

export default captureColorDropper;
