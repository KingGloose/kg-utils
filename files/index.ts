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
 * 该函数尝试撤销之前创建的文件 URL 对象，从而释放系统资源。
 * 如果在撤销过程中发生错误，它会记录错误信息并返回空字符串。
 *
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
 * 根据文件大小返回适当的文件大小字符串
 * @param {number} size - 文件大小（以字节为单位）
 * @returns {string} - 格式化后的文件大小字符串
 */
export function getfilesize(size: number): string {
  const num = 1024.0; // byte
  if (size < num) return size + " B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + " KB"; // kb
  if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + " MB"; // M
  if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + " G"; // G
  return (size / Math.pow(num, 4)).toFixed(2) + " T"; // T
}
