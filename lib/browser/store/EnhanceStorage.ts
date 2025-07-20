import { baseStore } from './baseStore';
import isEmpty from '../../common/is/isEmpty';
import jsonParse from '../../common/common/jsonParse';

export enum STORAGE_TYPE {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage',
}

export type ExpireItem = {
  createTime: number;
  expireTime: number;
};

// 增强 storage
// 01 将存储数据转到内存中，提高查找速度
// 02 过期时间，惰性删除数据
// 03 加解密函数
// 04 命名空间支持
class EnhanceStorage extends baseStore {
  private storage: Storage; // 存储实例
  private namespace: string = ''; // 命名空间

  private cache = new Map<string, any>(); // 数据缓存
  private expireList = new Map<string, ExpireItem>(); // 过期列表缓存
  private decodeHandler = (value: any) => value; // 解密默认函数
  private encodeHandler = (value: any) => value; // 加密默认函数

  private EXPIRE_TIME_LIST_KEY: string; // 过期时间列表键名

  /**
   * 创建增强存储实例，支持命名空间、过期时间、加解密
   * @param nameSpace 命名空间，用于数据隔离
   * @param storageType 存储类型：LOCAL或SESSION
   * @param decodeHandler 解密函数（可选）
   * @param encodeHandler 加密函数（可选）
   * @example
   * const storage = new EnhanceStorage('myApp', STORAGE_TYPE.Local);
   */
  constructor(nameSpace: string, storageType: STORAGE_TYPE, decodeHandler?: any, encodeHandler?: any) {
    super();

    this.storage = window[storageType] as Storage;
    this.namespace = nameSpace;
    this.EXPIRE_TIME_LIST_KEY = this.getSpaceKey('expire_time_list'); // 过期时间列表键名
    if (decodeHandler) this.decodeHandler = decodeHandler;
    if (encodeHandler) this.encodeHandler = encodeHandler;

    this.syncStorageToCache();
    this.checkExpireAll();
  }

  /**
   * 生成带命名空间的完整键名
   * @param key 原始键名
   * @returns 完整键名，格式：__namespace/key__
   */
  private getSpaceKey<K>(key: K) {
    return `__${this.namespace}/${key}__`;
  }

  /**
   * 将存储数据同步到内存缓存，提高读取性能
   */
  private syncStorageToCache() {
    // 更新数据
    for (const spaceKey in this.storage) {
      if (spaceKey === this.EXPIRE_TIME_LIST_KEY) continue;
      if (!(spaceKey.startsWith(`__${this.namespace}`) && spaceKey.endsWith(`__`))) continue;
      const value = this.storage.getItem(spaceKey);
      if (!isEmpty(value)) this.cache.set(spaceKey, value);
    }

    // 更新过期列表
    const expireListStr = this.storage.getItem(this.EXPIRE_TIME_LIST_KEY) || '{}';
    const expireListParse = jsonParse(expireListStr) as { [key: string]: ExpireItem };
    for (const spaceKey in expireListParse) {
      const expireItem = expireListParse[spaceKey];
      this.expireList.set(spaceKey, expireItem);
    }
  }

  /**
   * 将过期时间列表同步到存储中
   */
  private syncExpireCacheToStorage() {
    const expireList = Object.fromEntries(this.expireList);
    const expireListStr = JSON.stringify(expireList);
    this.storage.setItem(this.EXPIRE_TIME_LIST_KEY, expireListStr);
  }

  /**
   * 延迟执行同步操作，避免频繁写入
   * @param cb 回调函数
   * @param delay 延迟时间（毫秒）
   */
  private syncTimer: number | null = null;
  private scheduleSync(cb: () => void, delay: number = 1000): void {
    if (this.syncTimer) clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(cb, delay);
  }
  private scheduleSyncExpireCacheToStorage() {
    this.scheduleSync(this.syncExpireCacheToStorage, 1000);
  }

  /**
   * 设置存储项，支持过期时间
   * @param key 键名
   * @param value 值（支持任意类型）
   * @param expire 过期时间（毫秒），0表示永不过期
   * @example
   * storage.setItem('user', { name: '张三' }, 3600000); // 1小时后过期
   */
  setItem<K = string, V = any>(key: K, value: V, expire: number = 0): void {
    const spaceKey = this.getSpaceKey(key);
    if (!isEmpty(expire) && expire > 0) {
      this.expireList.set(spaceKey, {
        createTime: Date.now(),
        expireTime: Date.now() + expire,
      });
    }
    this.cache.set(spaceKey, value);
    const encodeValue = this.encodeHandler(value);
    const encodeValueStr = JSON.stringify(encodeValue);
    this.storage.setItem(spaceKey, encodeValueStr);
    this.scheduleSyncExpireCacheToStorage(); // 同步过期时间列表
  }

  /**
   * 获取存储项的值，过期数据自动返回null
   * @param key 键名
   * @returns 存储的值，不存在或过期返回null
   * @example
   * const user = storage.getItem('user'); // { name: '张三' } 或 null
   */
  getItem<K = string>(key: K): any {
    const spaceKey = this.getSpaceKey(key);
    const expireItem = this.expireList.get(spaceKey);

    if (expireItem && expireItem.expireTime < Date.now()) {
      this.removeItem(key);
      return null;
    }

    let value = this.cache.get(spaceKey);
    if (!value) {
      const storageValue = this.storage.getItem(spaceKey);
      const decodeValue = this.decodeHandler(storageValue);
      if (decodeValue) {
        value = jsonParse(decodeValue);
      }
    }
    return value;
  }

  /**
   * 删除存储项
   * @param key 要删除的键名
   * @example
   * storage.removeItem('user');
   */
  removeItem<K>(key: K): void {
    const spaceKey = this.getSpaceKey(key);
    this.cache.delete(spaceKey);
    this.expireList.delete(spaceKey);
    this.storage.removeItem(spaceKey);
    this.scheduleSyncExpireCacheToStorage();
  }

  /**
   * 清空当前命名空间下的所有数据
   * @example
   * storage.clear(); // 清空所有数据
   */
  clear(): void {
    for (const spaceKey in this.storage) {
      if (!(spaceKey.startsWith(`__${this.namespace}`) && spaceKey.endsWith(`__`))) continue;
      this.storage.removeItem(spaceKey);
    }
    this.cache.clear();
    this.expireList.clear();
  }

  /**
   * 异步获取数据并自动缓存，常用于API数据缓存
   * @param cb 异步回调函数，返回要缓存的数据
   * @param key 缓存键名
   * @param expire 过期时间（毫秒），0表示永不过期
   * @returns Promise<V> 返回获取到的数据
   * @example
   * const userData = await storage.useStorage(
   *   async () => fetch('/api/user').then(r => r.json()),
   *   'userData',
   *   3600000 // 1小时过期
   * );
   */
  async useStorage<K = string, V = any>(cb: () => V | Promise<V>, key: K, expire: number = 0): Promise<V> {
    let value = this.getItem<K>(key);
    if (!value) {
      value = await cb();
      this.setItem(key, value, expire);
    }
    return value;
  }

  /**
   * 检查存储项是否已过期
   * @param key 键名
   * @returns 已过期返回true，否则返回false
   * @example
   * const isExpired = storage.isExpired('user'); // true 或 false
   */
  isExpired<K = string>(key: K) {
    const spaceKey = this.getSpaceKey<K>(key);
    let expireItem = this.expireList.get(spaceKey);

    if (!expireItem) {
      const expireListStr = this.storage.getItem(this.EXPIRE_TIME_LIST_KEY);
      if (expireListStr) {
        const expireList = jsonParse(expireListStr) as Record<string, ExpireItem>;
        expireItem = expireList[spaceKey];
      }
    }

    return !expireItem || expireItem.expireTime < Date.now();
  }

  /**
   * 清理所有已过期的存储项
   * @example
   * storage.checkExpireAll(); // 清理过期数据
   */
  checkExpireAll() {
    for (const key of this.expireList.keys()) {
      const isExpire = this.isExpired(key);
      if (isExpire) this.removeItem(key);
    }
    this.scheduleSyncExpireCacheToStorage();
  }

  /**
   * 检查存储项是否存在且未过期
   * @param key 键名
   * @returns 存在且未过期返回true，否则返回false
   * @example
   * const exists = storage.hasItem('user'); // true 或 false
   */
  hasItem<K = string>(key: K): boolean {
    return this.getItem(key) !== null;
  }

  /**
   * 批量设置多个存储项，一次性存储多个键值对
   * @param items 存储项数组，每个项包含 key（键名）、value（值）、expire（过期时间，毫秒）
   * @example
   * storage.batchSetItem([
   *   { key: 'user1', value: { name: '张三' }, expire: 3600000 },
   *   { key: 'settings', value: { theme: 'dark' }, expire: 0 }
   * ]);
   */
  batchSetItem<K = string, V = any>(items: { key: K; value: V; expire: number }[]): void {
    for (const item of items) {
      this.setItem<K, V>(item.key, item.value, item.expire);
    }
  }

  /**
   * 批量获取多个存储项的值，返回一个数组
   * @param keys 要获取的键名数组
   * @returns 对应的值数组，不存在的键返回 null
   * @example
   * const values = storage.batchGetItem(['user1', 'settings']);
   * // 返回: [{ name: '张三' }, { theme: 'dark' }]
   */
  batchGetItem<K = string>(keys: K[]): any[] {
    return keys.map(key => this.getItem<K>(key));
  }

  /**
   * 批量删除多个存储项
   * @param keys 要删除的键名数组
   * @example
   * storage.batchRemoveItem(['tempData', 'cacheData']);
   */
  batchRemoveItem<K = string>(keys: K[]): void {
    for (const key of keys) this.removeItem<K>(key);
  }

  /**
   * 获取当前命名空间下的所有键名
   * @returns 所有键名的数组
   * @example
   * const keys = storage.getAllKeys(); // ['user1', 'settings', 'tempData']
   */
  getAllKeys(): string[] {
    const keys: string[] = [];

    for (const spaceKey in this.storage) {
      if (spaceKey.startsWith(`__${this.namespace}`) && spaceKey.endsWith('__')) {
        // 移除命名空间前缀和后缀
        const key = spaceKey.replace(`__${this.namespace}/`, '').replace('__', '');
        if (key !== 'expire_time_list') {
          keys.push(key);
        }
      }
    }

    return keys;
  }

  /**
   * 获取存储项数量
   * @returns 当前命名空间下的存储项数量
   */
  getItemCount(): number {
    return this.getAllKeys().length;
  }
}

export default EnhanceStorage;
