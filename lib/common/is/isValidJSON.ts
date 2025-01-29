/**
 * 检查给定的字符串是否为有效的 JSON
 * @param json 待验证的 JSON 字符串
 * @returns 如果字符串是有效的 JSON，则返回解析后的对象；否则返回 false
 */
function isValidJSON(json: string): any | false {
  try {
    return JSON.parse(json);
  } catch (e) {
    return false;
  }
}

export default isValidJSON;
