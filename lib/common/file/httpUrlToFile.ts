/**
 * 将 HTTP URL 转换为文件对象
 * @param {string} url - 文件的 URL 地址
 * @param {string} fileName - 文件名
 * @param {RequestInit} [options] - fetch 请求的配置选项
 * @returns {Promise<File | null>} - 转换后的文件对象，转换失败时返回 null
 */
function httpUrlToFile(url: string, fileName: string, options?: RequestInit): Promise<File | null> {
  return new Promise(async (resolve, reject) => {
    try {
      // 发起请求
      const response = await fetch(url, options);
      const contentType = response.headers.get("content-type") || "application/octet-stream";
      const blob = await response.blob();

      // 创建文件对象
      const file = new File([blob], fileName, {
        type: contentType,
        lastModified: Date.now(),
      });
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
}

export default httpUrlToFile;
