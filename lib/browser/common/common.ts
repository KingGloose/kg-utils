/**
 * 创建一个动画帧控制器，允许启动和停止基于时间的动画。
 *
 * @param animationFn - 一个回调函数，接收一个表示动画进度的参数（范围从 0 到 1）。
 * @param animationTime - 动画的总持续时间（以毫秒为单位）。默认值为 0，表示动画会一直进行直到手动停止。
 * @returns 一个对象，包含两个方法：
 *   - `start`: 启动动画。
 *   - `stop`: 停止动画。
 */
export function useAnimationFrame(animationFn: (progress: number) => void, animationTime = 0): { start: any; stop: any } {
  let isFinish = false;

  const start = () => {
    let startTime: number = 0;
    const animation = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / animationTime;
      if (!isFinish && progress <= 1) {
        animationFn(progress);
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const stop = () => {
    isFinish = true;
  };

  return { start, stop };
}

/**
 * 检测当前浏览器类型 IIFE优化
 * @returns 当前浏览器的类型名称，若无法识别则返回空字符串
 */
export const browserType = (function () {
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

/**
 * 获取操作系统类型 IIFE优化
 * @returns {string} 操作系统名称
 */
export const getOSType = (function () {
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
