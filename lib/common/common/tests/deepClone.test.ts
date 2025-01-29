import { deepClone, CLONE_MODE } from "../common";

describe("deepClone 函数测试", () => {
  const complexObj = {
    // 基础数据类型
    num: 0,
    str: "",
    bool: true,
    unf: undefined,
    nul: null,
    sym: Symbol("sym"),
    bign: BigInt(1),

    // Object类型
    obj: {
      name: "我是一个对象",
      id: 1,
    },
    arr: [0, 1, 2],
    func: function () {
      console.log("我是一个函数");
    },
    date: new Date(0),
    reg: new RegExp("/我是一个正则/ig"),
    map: new Map().set("mapKey", 1),
    set: new Set().add("set"),
  } as any;
  // Symbol作为key
  complexObj[Symbol("1")] = 1;
  // 添加不可枚举属性
  Object.defineProperty(complexObj, "innumerable", {
    enumerable: false,
    value: "不可枚举属性",
  });
  // 设置原型对象
  Object.setPrototypeOf(complexObj, {
    proto: "proto",
  });
  // 设置循环引用
  complexObj.loop = complexObj;

  const clonedObj = deepClone(complexObj, CLONE_MODE.HANDLER);

  test("基础数据克隆", () => {
    // Number
    expect(clonedObj.num).toBe(0);
    // String
    expect(clonedObj.str).toBe("");
    // Boolean
    expect(clonedObj.bool).toBe(true);
    // Undefined
    expect(clonedObj.unf).toBeUndefined();
    // Null
    expect(clonedObj.nul).toBeNull();
    // Symbol 作为 value
    expect(typeof clonedObj.sym).toBe("symbol");
    expect(clonedObj.sym.description).toBe("sym");
    // BigInt
    expect(clonedObj.bign).toBe(BigInt(1));
  });

  test("object类型克隆", () => {
    // Object
    expect(clonedObj.obj).toEqual({ name: "我是一个对象", id: 1 });
    expect(clonedObj.obj).not.toBe(complexObj.obj);
    // Array
    expect(clonedObj.arr).toEqual([0, 1, 2]);
    expect(clonedObj.arr).not.toBe(complexObj.arr);
    // Function
    expect(typeof clonedObj.func).toBe("function");
    expect(clonedObj.func.toString()).toBe(complexObj.func.toString());
    // Date
    expect(clonedObj.date instanceof Date).toBe(true);
    expect(clonedObj.date.getTime()).toBe(0);
    expect(clonedObj.date).not.toBe(complexObj.date);
    // RegExp
    expect(clonedObj.reg instanceof RegExp).toBe(true);
    expect(clonedObj.reg.toString()).toBe(complexObj.reg.toString());
    expect(clonedObj.reg).not.toBe(complexObj.reg);
    // Map
    expect(clonedObj.map instanceof Map).toBe(true);
    expect(clonedObj.map.get("mapKey")).toBe(1);
    expect(clonedObj.map).not.toBe(complexObj.map);
    // Set
    expect(clonedObj.set instanceof Set).toBe(true);
    expect(Array.from(clonedObj.set)[0]).toBe("set");
    expect(clonedObj.set).not.toBe(complexObj.set);
    // Symbol 作为 key
    const clonedSymbolKey = Object.getOwnPropertySymbols(clonedObj)[0];
    expect(typeof clonedSymbolKey).toBe("symbol");
    expect(clonedSymbolKey.description).toBe("1");
    expect(clonedObj[clonedSymbolKey]).toBe(1);
  });

  test("object类型其他克隆", () => {
    // 不可枚举属性
    expect(Object.getOwnPropertyDescriptor(clonedObj, "innumerable")).toEqual(Object.getOwnPropertyDescriptor(complexObj, "innumerable"));
    // 处理原型链
    expect(Object.getPrototypeOf(clonedObj)).toEqual(Object.getPrototypeOf(complexObj));
    // 处理循环引用
    expect(clonedObj.loop).toBe(clonedObj);
    expect(clonedObj.loop.loop).toBe(clonedObj);
  });
});
