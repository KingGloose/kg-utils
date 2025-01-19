/**
 * 检查一个值是否为对象
 * @param value 要检查的值
 * @param isPlain 是否要求为纯对象（默认 true）
 * @returns 如果符合条件则返回 true，否则返回 false
 */
export function isObject(value: unknown, isPlain: boolean = true): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return isPlain ? Object.prototype.toString.call(value) === "[object Object]" : true;
}

/**
 * 检查给定的字符串是否为有效的URL
 * 从而避免了正则表达式的复杂性和不准确性
 * @param url 待验证的URL字符串
 * @returns 如果输入字符串为有效的URL，则返回true；否则返回false
 */
export function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
