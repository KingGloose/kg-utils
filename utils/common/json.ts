/**
 * 尝试将字符串解析为 JSON 对象。
 * 如果字符串不是有效的 JSON 格式或解析失败，则返回原始字符串。
 * 
 * @template T - JSON 解析后的目标类型
 * @param {string} value - 要解析的字符串
 * @returns {T | string} - 解析成功返回类型 T 的对象，失败返回原始字符串
 * 
 * @example
 * // 基础使用
 * jsonParse('{"name": "张三"}') // 返回对象 { name: '张三' }
 * jsonParse('hello') // 返回字符串 'hello'
 * 
 * // 使用泛型指定返回类型
 * interface User { name: string; age: number }
 * jsonParse<User>('{"name": "张三", "age": 25}') // 返回 User 类型对象
 */
export function jsonParse<T = unknown>(value: string): T | string {
  try {
    if ((value.startsWith("{") && value.endsWith("}")) || 
        (value.startsWith("[") && value.endsWith("]"))) {
      return JSON.parse(value);
    }
    return value;
  } catch {
    return value;
  }
}