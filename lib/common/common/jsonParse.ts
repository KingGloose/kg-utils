/**
 * 尝试将字符串解析为 JSON 对象，如果解析失败，则返回原始字符串。
 * @param value - 要解析的 JSON 字符串。
 * @returns {T | string | number} - 解析后的结果。如果解析成功，返回解析后的对象或原始数据类型（如字符串、数字等）；如果解析失败，返回原始的 `value`。
 * @example
 * jsonParse('{"name":"John"}'); // 返回 { name: 'John' }
 * jsonParse('123'); // 返回 123
 * jsonParse('Hello, world!'); // 返回 'Hello, world!'
 */
function jsonParse<T = unknown>(value: string): T | string | number {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export default jsonParse;
