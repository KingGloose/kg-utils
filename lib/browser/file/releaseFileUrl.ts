import windwoURL from "./windowURL";

/**
 * 释放指定的文件 URL 对象，以释放资源
 * @param {string} url - 需要撤销的文件 URL
 * @returns {void} - 如果发生错误则返回空字符串
 */
function releaseFileUrl(url: string): void {
  try {
    const windowURL = windwoURL;
    windowURL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
}

export default releaseFileUrl;
