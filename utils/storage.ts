import { isEmpty } from "./is";

export enum StorageType {
  Local = "localStorage",
  Session = "sessionStorage",
}

export type ExpireItem = {
  createTime: number;
  expireTime: number;
};

// 增强 storage
// 01 初始化的时候会将
class EnhanceStorage {
  private storage: Storage;
  private namespace: string = ""; // 命名空间

  private cache = new Map<string, any>();
  private expireList = new Map<string, ExpireItem>();
  private decodeHandler = (value: any) => value; // 解密默认函数
  private encodeHandler = (value: any) => value; // 加密默认函数

  private EXPIRE_TIME_LIST_KEY: string;

  /**
   * 构造函数，初始化存储实例
   * @param nameSpace - 存储的命名空间
   * @param storageType - 存储类型，可以是 Local 或 Session
   * @param decodeHandler - 可选参数，用于解密存储的值
   * @param encodeHandler - 可选参数，用于加密存储的值
   */
  constructor(nameSpace: string, storageType: StorageType, decodeHandler?: any, encodeHandler?: any) {
    this.storage = window[storageType] as Storage;
    this.namespace = nameSpace;
    if (decodeHandler) this.decodeHandler = decodeHandler;
    if (encodeHandler) this.encodeHandler = encodeHandler;

    this.EXPIRE_TIME_LIST_KEY = this.getSpaceKey("expire_key_list");

    this.syncStorageToCache();
    this.checkExpireAll();
  }

  /**
   * 获取带有命名空间的键名
   * @param key - 原始键名
   * @returns 带有命名空间的键名
   */
  private getSpaceKey(key: string) {
    return `__${this.namespace}-${key}__`;
  }

  /**
   * 将存储中的数据同步到内存中
   */
  private syncStorageToCache() {
    // 更新数据
    for (const spaceKey in this.storage) {
      if (spaceKey === this.EXPIRE_TIME_LIST_KEY) continue;
      if (!(spaceKey.startsWith(`__${this.namespace}-`) && spaceKey.endsWith(`__`))) continue;
      const value = this.storage.getItem(spaceKey);
      if (!isEmpty(value)) this.cache.set(spaceKey, value);
    }

    // 更新过期列表
    const expireListStr = this.storage.getItem(this.EXPIRE_TIME_LIST_KEY) || "{}";
    const expireListParse = JSON.parse(expireListStr) as { [key: string]: ExpireItem };
    for (const spaceKey in expireListParse) {
      this.expireList.set(spaceKey, expireListParse[spaceKey]);
    }
  }

  /**
   * 将过期列表内容同步到存储中
   */
  private syncExpireCacheToStorage() {
    this.storage.setItem(this.EXPIRE_TIME_LIST_KEY, JSON.stringify(Object.fromEntries(this.expireList)));
  }

  /**
   * 设置存储项
   * @param key - 存储项的键名
   * @param value - 存储项的值
   * @param expire - 可选参数，存储项的过期时间（毫秒）
   */
  setItem(key: string, value: any, expire: number = 0): void {
    const spaceKey = this.getSpaceKey(key);
    if (!isEmpty(expire) && expire > 0) {
      this.expireList.set(spaceKey, {
        createTime: Date.now(),
        expireTime: Date.now() + expire,
      });
    }
    this.cache.set(spaceKey, value);
    this.storage.setItem(spaceKey, JSON.stringify(this.encodeHandler(value)));
    this.syncExpireCacheToStorage();
  }

  /**
   * 获取存储项
   * @param key - 存储项的键名
   * @returns 存储项的值，如果已过期则返回 null
   */
  getItem(key: string): any {
    const spaceKey = this.getSpaceKey(key);
    const expireItem = this.expireList.get(spaceKey);

    if (expireItem && expireItem.expireTime < Date.now()) {
      this.deleteItem(key);
      return null;
    }

    let value = this.cache.get(spaceKey);
    if (!value) {
      const storageValue = this.storage.getItem(spaceKey);
      if (storageValue) {
        try {
          value = JSON.parse(this.decodeHandler(storageValue));
          this.cache.set(spaceKey, value);
        } catch {
          value = storageValue;
        }
      }
    }
    return value;
  }

  /**
   * 删除存储项
   * @param key - 存储项的键名
   */
  deleteItem(key: string): void {
    const spaceKey = this.getSpaceKey(key);
    this.cache.delete(spaceKey);
    this.expireList.delete(spaceKey);
    this.storage.removeItem(spaceKey);
    this.syncExpireCacheToStorage();
  }

  /**
   * 清空缓存和存储
   */
  clearCache(): void {
    this.cache.clear();
    this.expireList.clear();
    this.storage.clear();
  }

  /**
   * 检查存储项是否已过期
   * @param key - 存储项的键名
   * @returns 如果已过期则返回 true，否则返回 false
   */
  isExpired(key: string) {
    const spaceKey = this.getSpaceKey(key);
    let expireItem = this.expireList.get(spaceKey);

    if (!expireItem) {
      const expireListStr = this.storage.getItem(this.EXPIRE_TIME_LIST_KEY);
      if (expireListStr) {
        const expireList = JSON.parse(expireListStr) as Record<string, ExpireItem>;
        expireItem = expireList[spaceKey];
      }
    }

    return !expireItem || expireItem.expireTime < Date.now();
  }

  /**
   * 检查所有存储项，删除已过期的项
   */
  checkExpireAll() {
    for (const key of this.expireList.keys()) {
      const isExpire = this.isExpired(key);
      if (isExpire) this.deleteItem(key);
    }
  }
}

export default EnhanceStorage;
