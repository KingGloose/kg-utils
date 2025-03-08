/**
 * 检查一个数组是否为稀疏数组
 * 稀疏数组是指数组中的元素不是连续存储的，即包含空槽（empty slots）
 * 例如: [1,,3] 或 new Array(3) 创建的数组
 * 
 * @param arr - 要检查的数组
 * @returns 如果是稀疏数组返回true，否则返回false
 * 
 * @example
 * ```typescript
 * isSparseArray([1,2,3]) // false
 * isSparseArray([1,,3]) // true
 * isSparseArray(new Array(3)) // true
 * ```
 */
function isSparseArray(arr: any[]): boolean {
  if (!Array.isArray(arr)) return false;
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) {
      return true;
    }
  }
  return false;
}

export default isSparseArray;
