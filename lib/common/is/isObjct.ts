/**
 * 检查一个值是否为对象
 * @param value 要检查的值
 * @param isPlain 是否要求为纯对象（默认 true）
 * @returns 如果符合条件则返回 true，否则返回 false
 */
function isObject(value: unknown, isPlain: boolean = true): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return isPlain ? Object.prototype.toString.call(value) === "[object Object]" : true;
}

export default isObject;
