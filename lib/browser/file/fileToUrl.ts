import windowURL from "./windowURL";

/**
 * 将文件对象转换为 URL
 * @param {File} file - 文件对象
 * @returns {string} - 文件对象的 URL
 */
function fileToUrl(file: File): string | undefined {
  try {
    return windowURL.createObjectURL(file);
  } catch (error) {
    console.log(error);
  }
}

export default fileToUrl;
