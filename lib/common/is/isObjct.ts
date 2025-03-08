/**
 * 检查一个值是否为对象
 * @param {unknown} value - 需要检查的值
 * @param {boolean} [isPlain=true] - 是否检查纯对象
 *   - true: 仅匹配普通对象 (通过 Object 直接创建或对象字面量创建的对象)
 *   - false: 匹配所有对象类型 (包括数组、Map、Set等)
 * @returns {boolean} 如果值为对象且符合 isPlain 的要求则返回 true，否则返回 false
 * @example
 * isObject({}) // true
 * isObject([]) // false
 * isObject([], false) // true
 * isObject(null) // false
 */
function isObject(value: unknown, isPlain: boolean = true): boolean {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return isPlain ? Object.prototype.toString.call(value) === "[object Object]" : true;
}

export default isObject;
