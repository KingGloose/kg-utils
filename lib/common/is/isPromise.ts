/**
 * 检查一个值是否是 Promise 对象
 * @param obj 要检查的值
 * @returns 如果值是 Promise，则返回 true；否则返回 false
 */
function isPromise(obj: any): boolean {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

export default isPromise;
