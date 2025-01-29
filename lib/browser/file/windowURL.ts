/**
 * 获取浏览器的 URL 创建对象，IIFE优化
 * @returns {URL} - 浏览器的 URL 创建对象
 * @throws {Error} - 如果浏览器不支持 URL API，则抛出错误
 */
const windowURL = (function () {
  const windowURL = window.URL || window.webkitURL;
  if (!windowURL) throw new Error("URL API is not supported in this environment.");
  return windowURL;
})();

export default windowURL;
