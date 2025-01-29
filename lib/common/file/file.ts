/**
 * 根据文件大小返回适当的文件大小字符串
 * @param {number} size - 文件大小（以字节为单位）
 * @returns {string} - 格式化后的文件大小字符串
 */
export function formatFileSize(size: number): string {
  const num = 1024.0; // byte
  if (size < num) return size + " B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + " KB"; // kb
  if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + " MB"; // M
  if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + " G"; // G
  return (size / Math.pow(num, 4)).toFixed(2) + " T"; // T
}
