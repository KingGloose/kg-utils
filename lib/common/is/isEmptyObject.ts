/**
 * 检查对象是否为空对象
 * @param obj - 要检查的对象
 * @returns 如果对象为空返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * isEmptyObject({})           // true
 * isEmptyObject({ a: 1 })     // false
 * isEmptyObject(null)         // throws TypeError
 * isEmptyObject(undefined)    // throws TypeError
 * ```
 */
function isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

export default isEmptyObject;
