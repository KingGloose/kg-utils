/**
 * 获取操作系统类型 IIFE优化
 * @returns {string} 操作系统名称
 */
const OSType = (function () {
  if (typeof window === "undefined" || !window.navigator?.userAgent) return "";

  const osMap = [
    { regex: /(iphone|ipad|ios)/i, type: "iOS" },
    { regex: /mac os/i, type: "Mac" },
    { regex: /(android|harmony)/i, type: "Android" },
    { regex: /windows/i, type: "Windows" },
  ];

  const ua = window.navigator.userAgent.toLowerCase();
  const os = osMap.find(({ regex }) => regex.test(ua));
  return os ? os.type : "";
})();

export default OSType;
