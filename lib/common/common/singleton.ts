/**
 * 创建单例代理的类装饰器
 * @param _class - 需要创建单例的类构造函数
 * @returns 代理后的单例构造函数
 *
 * @example
 * ```typescript
 * class Person {}
 * const SingletonPerson = singleton(Person);
 * const p1 = new SingletonPerson();
 * const p2 = new SingletonPerson();
 * console.log(p1 === p2); // true
 * ```
 *
 * @description
 * 通过 Proxy 代理目标类的构造函数：
 * 1. 首次实例化时通过 Reflect.construct 创建实例
 * 2. 后续实例化直接返回首次创建的实例
 * 3. 重写原型链的 constructor 指向代理类
 */
function singleton(_class: any) {
  let instance: any = null;
  const _proxy = new Proxy(_class, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });

  _class.prototype.constructor = _proxy;
  return _proxy;
}

export default singleton;
