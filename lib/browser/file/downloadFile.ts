import isValidURL from "../../common/is/isValidURL";

/**
 * 触发文件下载
 * @param {string} url - 文件的 URL 地址
 * @param {string} [name] - 下载时的文件名称（可选，默认为当前时间戳）
 */
function downloadFile(url: string, name: string = Date.now().toString()) {
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

export default downloadFile;
