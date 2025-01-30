/**
 * 检查给定对象是否为有效的文件对象
 * @param {unknown} file - 要检查的可能是文件的对象
 * @returns {Promise<boolean>} - 返回Promise，true表示是有效文件，false表示无效
 */
function checkIsFile(file: File): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const fileReader = new FileReader();

    // 只读取文件的前3个字节来验证
    const blob = file.slice(0, 3);

    const handleLoad = () => {
      cleanup();
      resolve(true);
    };

    const handleError = () => {
      cleanup();
      resolve(false);
    };

    // 清理函数：移除所有事件监听器
    const cleanup = () => {
      fileReader.removeEventListener("load", handleLoad);
      fileReader.removeEventListener("error", handleError);
    };

    // 添加事件监听器
    fileReader.addEventListener("load", handleLoad);
    fileReader.addEventListener("error", handleError);

    try {
      fileReader.readAsDataURL(blob);
    } catch (error) {
      console.error("文件读取失败:", error instanceof Error ? error.message : String(error));
      cleanup();
      resolve(false);
    }
  });
}

export default checkIsFile;
