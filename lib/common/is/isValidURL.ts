/**
 * 检查给定的字符串是否为有效的 URL，避免了正则表达式的复杂性和不准确性
 * @param url 待验证的 URL 字符串
 * @returns 如果输入字符串为有效的 URL，则返回 true；否则返回 false
 */
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export default isValidURL;
