import { isObject, isPromise } from "./is";

export enum CLONE_MODE {
  AUTO,
  ORIGIN,
  HANDLER,
}
/**
 * 深度克隆给定的值。
 *
 * @param value - 需要克隆的值，可以是任意类型（包括对象、数组、函数、日期、正则表达式、Map、Set等）。
 * @param type - 克隆模式，默认为 `CLONE_MODE.AUTO`。可选值：
 *   - `CLONE_MODE.AUTO`: 自动选择克隆方法，优先使用浏览器原生的 `structuredClone`，如果不可用则使用自定义的深度克隆逻辑。
 *   - `CLONE_MODE.ORIGIN`: 强制使用浏览器原生的 `structuredClone` 进行克隆。
 *   - `CLONE_MODE.HANDLER`: 使用自定义的深度克隆逻辑进行克隆。
 * @returns 返回克隆后的新值。
 */
export function deepClone(value: any, type = CLONE_MODE.AUTO) {
  let cloneMethod: any;
  const map = new WeakMap();
  const _handleDeep = function (oriValue: any) {
    // Base
    if (!isObject(oriValue)) {
      return oriValue;
    }

    // 循环引用
    if (map.has(oriValue)) {
      return map.get(oriValue);
    }

    // Array
    if (Array.isArray(oriValue)) {
      const newArr: any[] = [];
      for (const arrItem of oriValue) {
        newArr.push(cloneMethod(arrItem));
      }
      return newArr;
    }

    // Function
    if (typeof oriValue === "function") {
      return new Function("return " + oriValue.toString())();
    }

    // Date / RegExp
    if ([Date, RegExp].includes(oriValue.constructor)) {
      return oriValue.constructor(oriValue);
    }

    // Map
    if (oriValue instanceof Map) {
      const newMap = new Map();
      map.set(oriValue, newMap);
      for (const [key, value] of oriValue) {
        newMap.set(key, cloneMethod(value));
      }
      return newMap;
    }

    // Set
    if (oriValue instanceof Set) {
      const newSet = new Set<any>();
      map.set(oriValue, newSet);
      for (const setItem of oriValue) {
        newSet.add(cloneMethod(setItem));
      }
      return newSet;
    }

    // Symbol
    if (typeof oriValue === "symbol") {
      return Symbol(oriValue.description);
    }

    // Object
    const newObj: Record<string, any> = {};
    for (const key in oriValue) {
      map.set(oriValue, newObj);
      newObj[key] = cloneMethod(oriValue[key]);
    }

    // 如果 Symbol 作为 key
    const symbolKeys = Object.getOwnPropertySymbols(oriValue);
    for (const symbolKey of symbolKeys) {
      const newSymbolKey = Symbol(symbolKey.description);
      Reflect.set(newObj, newSymbolKey, cloneMethod(oriValue[symbolKey]));
    }

    return newObj;
  };

  if (type === CLONE_MODE.AUTO) {
    cloneMethod = typeof structuredClone === "function" ? structuredClone : _handleDeep;
  } else if (type === CLONE_MODE.ORIGIN) {
    cloneMethod = structuredClone;
  } else if (type === CLONE_MODE.HANDLER) {
    cloneMethod = _handleDeep;
  }

  return cloneMethod(value);
}

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

/**
 * 等待
 * @param ms 延迟的毫秒数
 * @returns 一个在指定毫秒数后解决的Promise对象
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
