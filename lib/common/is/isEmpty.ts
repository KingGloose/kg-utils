/**
 * 检查给定的值是否为空，此函数用于确定一个值是否为 null、undefined 或空字符串
 * @param value 要检查的值，可以是任何类型
 * @returns 如果值为 null、undefined 或空字符串，则返回 true；否则返回 false
 */
function isEmpty(value: unknown): boolean {
  return value === null || value === undefined;
}

export default isEmpty;
