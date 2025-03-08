// 用于消除异步得传染性高阶函数，目前为实验阶段，暂时使用 fetch 来做处理
/**
 * 消除异步操作的传染性高阶函数
 * 
 * 该函数通过劫持fetch方法实现异步请求的缓存和重试机制，使得同步函数能够处理异步操作。
 * 当捕获到Promise时会自动重试执行原始函数，直到异步操作完成。
 *
 * @param {Function} fn 需要执行的目标函数，函数内部包含潜在的异步操作
 * @example
 * function main() {
 *   console.log(getUser()); // 第一次调用会抛出Promise
 * }
 * sanitizeAsyncContagion(main); // 最终会输出获取的用户数据
 * 
 * @implementation
 * 1. 创建缓存对象记录请求状态
 * 2. 劫持原fetch方法，实现：
 *    - 命中缓存时直接返回/抛出缓存结果
 *    - 未命中缓存时发起请求并缓存结果
 * 3. 执行目标函数并捕获可能抛出的Promise
 * 4. Promise完成后恢复原fetch方法并重新执行目标函数
 */
function sanitizeAsyncContagion(fn) {
  const cache = {
    status: "pending", // pending, fullfilled, rejected,
    value: null,
  };

  const oldFetch = window.fetch;
  const newFetch = function (url) {
    if (cache.status === "fullfilled") {
      return cache.value;
    } else if (cache.status === "rejected") {
      throw cache.value;
    }

    const promiseFetch = oldFetch(url)
      .then((res) => res.json())
      .then((data) => {
        cache.status = "fullfilled";
        cache.value = data;
      })
      .catch((rej) => {
        cache.status = "rejected";
        cache.value = rej;
      });
    throw promiseFetch;
  };

  // @ts-ignore
  window.fetch = newFetch;

  try {
    fn();
  } catch (promiseFetch) {
    if (promiseFetch instanceof Promise) {
      promiseFetch.finally(() => {
        // @ts-ignore
        window.fetch = newFetch;
        fn();
        window.fetch = oldFetch;
      });
    }
  }

  window.fetch = oldFetch;
}

function getUser() {
  return fetch("https://registry.npmjs.org/@kg-cli/cli");
}

function main() {
  console.log("main1");
  console.log(getUser());
  console.log("main2");
}

sanitizeAsyncContagion(main);
