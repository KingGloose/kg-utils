/**
 * 检查当前页面是否在安全上下文中运行
 * @returns {boolean} 如果在安全上下文中返回true，否则返回false
 *
 * @description
 * 安全上下文的条件：
 * 1. 使用HTTPS协议
 * 2. 使用localhost
 * 3. 使用file://协议
 * 4. 使用127.0.0.1或::1
 *
 * @example
 * if (isSecureContext()) {
 *   console.log('当前在安全上下文中');
 * } else {
 *   console.log('当前不在安全上下文中');
 * }
 */
const isSecureContext = (function () {
  if (typeof window.isSecureContext !== "undefined") {
    return window.isSecureContext;
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  return (
    protocol === "https:" ||
    protocol === "file:" ||
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname === "127.0.0.1" ||
    hostname === ""
  );
})();

export default isSecureContext;
