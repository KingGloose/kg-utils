/**
 * 生成指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 生成的随机数

 * @example
 * // 生成 [1, 10] 范围内的随机数（包含1和10）
 * getRandom(1, 10) // => 1 到 10 之间的随机数
 */
function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandom;
