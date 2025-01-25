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
 * 检查给定的值是否为空，此函数用于确定一个值是否为 null、undefined 或空字符串
 * @param value 要检查的值，可以是任何类型
 * @returns 如果值为 null、undefined 或空字符串，则返回 true；否则返回 false
 */
export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

/**
 * 检查给定的字符串是否为有效的 URL，避免了正则表达式的复杂性和不准确性
 * @param url 待验证的 URL 字符串
 * @returns 如果输入字符串为有效的 URL，则返回 true；否则返回 false
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 检查给定的字符串是否为有效的 JSON
 * @param json 待验证的 JSON 字符串
 * @returns 如果字符串是有效的 JSON，则返回解析后的对象；否则返回 false
 */
export function isValidJSON(json: string): any | false {
  try {
    return JSON.parse(json);
  } catch (e) {
    return false;
  }
}

/**
 * 检查一个值是否是 Promise 对象
 * @param obj 要检查的值
 * @returns 如果值是 Promise，则返回 true；否则返回 false
 */
export function isPromise(obj: any): boolean {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
