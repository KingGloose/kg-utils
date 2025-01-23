import { isEmpty } from "./is";

// TODO
// 01 添加 namespace 做区分

// 反思
// 为什么这个这么简单的东西写了这么长时间，1个小时绰绰有余，但是写了近3个小时
// 01 一开始方向没定好，这东西不是打眼睛就确定高德东西，为什么没定好
// 02 方案一直在做修改，和 01 一致，一开始就想好再去写
// 03 写代码 和 修bug 测试时间，留 6:4 的时间

enum StorageType {
  Local = "localStorage",
  Session = "sessionStorage",
}

type ExpireItem = {
  createTime: number;
  expireTime: number;
};

class EnhanceStorage {
  private storage: Storage;
  private namespace: string = ""; // 命名空间

  private cache = new Map<string, any>();
  private expireList = new Map<string, ExpireItem>();
  private decodeHandler = (value: any) => value; // 解密
  private encodeHandler = (value: any) => value; // 加密

  private EXPIRE_TIME_LIST_KEY: string;

  constructor(nameSpace: string, storageType: StorageType, decodeHandler?: any, encodeHandler?: any) {
    this.storage = window[storageType] as Storage;
    this.namespace = nameSpace;
    if (decodeHandler) this.decodeHandler = decodeHandler;
    if (encodeHandler) this.encodeHandler = encodeHandler;

    this.EXPIRE_TIME_LIST_KEY = this.getSpaceKey("expire_key_list");

    this.syncStorageToCache();
    this.checkExpireAll();
  }

  private getSpaceKey(key: string) {
    return `__${this.namespace}-${key}__`;
  }

  private syncStorageToCache() {
    // 更新数据
    for (const key in this.storage) {
      if (key === this.EXPIRE_TIME_LIST_KEY) continue;
      const value = this.storage.getItem(key);
      if (!isEmpty(value)) this.cache.set(key, value);
    }

    // 更新过期列表
    const expireListStr = this.storage.getItem(this.EXPIRE_TIME_LIST_KEY) || "{}";
    const expireListParse = JSON.parse(expireListStr) as { [key: string]: ExpireItem };
    for (const key in expireListParse) {
      this.expireList.set(key, expireListParse[key]);
    }
  }

  private syncExpireCacheToStorage() {
    this.storage.setItem(this.EXPIRE_TIME_LIST_KEY, JSON.stringify(Object.fromEntries(this.expireList)));
  }

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

  deleteItem(key: string): void {
    const spaceKey = this.getSpaceKey(key);
    this.cache.delete(spaceKey);
    this.expireList.delete(spaceKey);
    this.storage.removeItem(spaceKey);
    this.syncExpireCacheToStorage();
  }

  clearCache(): void {
    this.cache.clear();
    this.expireList.clear();
    this.storage.clear();
  }

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

  checkExpireAll() {
    for (const key of this.expireList.keys()) {
      const isExpire = this.isExpired(key);
      if (isExpire) this.deleteItem(key);
    }
  }
}

export default EnhanceStorage;
