import { isValidURL } from "../../common/common/is";

/**
 * 获取浏览器的 URL 创建对象
 * @returns {URL} - 浏览器的 URL 创建对象
 * @throws {Error} - 如果浏览器不支持 URL API，则抛出错误
 */
export function getFileUrl(): typeof URL {
  const windowURL = window.URL || window.webkitURL;
  if (!windowURL) throw new Error("URL API is not supported in this environment.");
  return windowURL;
}

/**
 * 获取浏览器的 URL 创建对象，IIFE优化
 * @returns {URL} - 浏览器的 URL 创建对象
 * @throws {Error} - 如果浏览器不支持 URL API，则抛出错误
 */
export const windwoURL = (function () {
  const windowURL = window.URL || window.webkitURL;
  if (!windowURL) throw new Error("URL API is not supported in this environment.");
  return windowURL;
})();

/**
 * 将文件对象转换为 URL
 * @param {File} file - 文件对象
 * @returns {string} - 文件对象的 URL
 */
export function fileToUrl(file: File): string | undefined {
  try {
    const windowURL = getFileUrl();
    return windowURL.createObjectURL(file);
  } catch (error) {
    console.log(error);
  }
}

/**
 * 释放指定的文件 URL 对象，以释放资源
 * @param {string} url - 需要撤销的文件 URL
 * @returns {void} - 如果发生错误则返回空字符串
 */
export function releaseFileUrl(url: string): void {
  try {
    const windowURL = getFileUrl();
    windowURL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
}

/**
 * 触发文件下载
 * @param {string} url - 文件的 URL 地址
 * @param {string} [name] - 下载时的文件名称（可选，默认为当前时间戳）
 */
export function downloadFile(url: string, name: string = Date.now().toString()) {
  try {
    if (!isValidURL(url)) throw new Error("Invalid URL");

    const a = document.createElement("a");
    a.href = url;
    a.download = name;

    if (typeof a.download === "undefined") {
      window.open(name, "_blank");
    } else {
      a.click();
    }
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
