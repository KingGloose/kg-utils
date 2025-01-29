/**
 * 将 base64 字符串转换为文件对象
 * @param {string} base64 - base64 编码的字符串
 * @param {string} fileName - 文件名
 * @param {string} [type] - 文件类型（可选）
 * @returns {File | null} - 转换后的文件对象，转换失败时返回 null
 */
function base64ToImgFile(base64: string, fileName: string, type?: string): File | null {
  const base64Parts = base64.split(",");

  let mime = type;
  if (!mime) {
    const mimeMatch = base64Parts[0].match(/:(.*?);/);
    mime = mimeMatch ? mimeMatch[1] : "image/png";
  }

  try {
    const binaryString = atob(base64Parts[1]);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: mime });

    return new File([blob], fileName, {
      type: mime,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("base64 解码失败", error);
    return null;
  }
}

export default base64ToImgFile;
