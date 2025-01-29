/**
 * 检查数组是否为空数组
 * @param arr - 要检查的数组
 * @returns 如果数组为空返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * isEmptyArray([])           // true
 * isEmptyArray([1, 2, 3])    // false
 * isEmptyArray(null)         // throws TypeError
 * isEmptyArray(undefined)    // throws TypeError
 * ```
 */
function isEmptyArray(arr: any): boolean {
  return arr.length === 0;
}

export default isEmptyArray;
