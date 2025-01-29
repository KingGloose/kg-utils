/**
 * 等待
 * @param ms 延迟的毫秒数
 * @returns 一个在指定毫秒数后解决的Promise对象
 */
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;
