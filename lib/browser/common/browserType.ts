/**
 * 检测当前浏览器类型 IIFE优化
 * @returns 当前浏览器的类型名称，若无法识别则返回空字符串
 */
const browserType = (function () {
  if (typeof window === "undefined" || !window.navigator?.userAgent) return "";
  const browserMap = [
    { regex: /msie|trident/, type: "IE" },
    { regex: /edg|edge/, type: "Edge" },
    { regex: /firefox/, type: "Firefox" },
    { regex: /ucbrowser/, type: "UC" },
    { regex: /opera|opr/, type: "Opera" },
    { regex: /baidubrowser/, type: "Baidu" },
    { regex: /metasr/, type: "Sougou" },
    { regex: /tencenttraveler|qqbrowse/, type: "QQ" },
    { regex: /maxthon/, type: "Maxthon" },
    { regex: /lbbrowser/, type: "Liebao" },
    { regex: /2345explorer/, type: "2345" },
    { regex: /qihu 360ee/, type: "360" },
    { regex: /chrome/, type: "Chrome" },
    { regex: /safari/, type: "Safari" },
  ];

  const ua = window.navigator.userAgent.toLowerCase();
  const browser = browserMap.find(({ regex }) => regex.test(ua));
  return browser ? browser.type : "";
})();

export default browserType;
