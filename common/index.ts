import { isObject } from "../is/index";

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

    // 解决循环引用
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
