/**
 * 尝试执行一个函数，并捕获可能的同步或异步错误。
 *
 * @template T 函数 `fn` 的返回值类型，可以是同步值或 `Promise`。
 * @param {(...args: any[]) => T | Promise<T>} fn 需要执行的目标函数，支持同步和异步函数。
 * @param {...any[]} args 传递给 `fn` 的参数。
 * @returns {T | Promise<T | Error>} 如果 `fn` 为同步函数，则直接返回 `fn(...args)` 的执行结果或错误对象。
 *                                   如果 `fn` 为异步函数，则返回一个 `Promise`，其 `resolve` 结果为 `fn(...args)` 的值或错误对象。
 *
 * @example
 * // 示例：处理同步函数
 * function syncFunction(value: number) {
 *   if (value < 0) throw new Error("Negative number!");
 *   return value * 2;
 * }
 * console.log(tryCatch(syncFunction, 5));  // 10
 * console.log(tryCatch(syncFunction, -1)); // Error: Negative number!
 *
 * @example
 * // 示例：处理异步函数
 * async function asyncFunction(value: number) {
 *   if (value < 0) throw new Error("Negative number!");
 *   return value * 2;
 * }
 * tryCatch(asyncFunction, 5).then(console.log);  // 10
 * tryCatch(asyncFunction, -1).then(console.log); // Error: Negative number!
 */
function tryCatch<T>(fn: (...args: any[]) => T | Promise<T>, ...args: any[]): T | Promise<T> {
  try {
    const result = fn.apply(null, args);
    if (result instanceof Promise) {
      return new Promise((resolve) => {
        result.then((result: any) => resolve(result)).catch((error) => resolve(error));
      });
    }
    return result;
  } catch (error) {
    return error as any;
  }
}

export default tryCatch;
