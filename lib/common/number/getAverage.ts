/**
 * 计算数字数组的平均值
 * @param {number[]} numbers - 要计算平均值的数字数组
 * @param {number} [precision=2] - 结果保留的小数位数（0-20之间）
 * @returns {number} 返回计算后的平均值
 *
 * @example
 * // 基础使用
 * getAverage([1, 2, 3]); // 返回 2.00
 *
 * // 指定精度
 * getAverage([1, 2, 3], 3); // 返回 2.000
 *
 * // 处理小数
 * getAverage([1.23, 2.45, 3.67]); // 返回 2.45
 */
function getAverage(numbers: number[], precision = 2): number {
  const average = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
  return Number(average.toFixed(precision));
}

export default getAverage;
