/**
 * 判断是否为有效的 IPv4 地址
 * @param ip 待验证的IP地址字符串
 * @returns 如果是有效的IPv4地址返回true，否则返回false
 */
export function isValidIPV4(ip: string): boolean {
  if (!ip) return false;

  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    if (!part) return false;
    const num = Number(part);
    if (isNaN(num)) return false;
    if (num % 1 !== 0) return false;
    if (num < 0 || num > 255) return false;
    if (part.length > 1 && part[0] === "0") return false;

    return true;
  });
}
