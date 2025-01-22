enum StorageType {
  Local = "localStorage",
  Session = "sessionStorage",
}

// TODO
// 01 set 的时候传递过期时间，到期就删除
// 02 每次进入都重新校验时间，然后删除不必要的数据
// 03 存储加密操作
// 04 自动将数据压入内存中，查找较快，也可以关闭该功能
// 05 监听 storage 变化的封装
class EnhanceStorage {
  private storage: Storage;

  constructor(storageType: StorageType) {
    this.storage = window[storageType] as Storage;
  }

  setCache<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCache<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  deleteCache(key: string): void {
    this.storage.removeItem(key);
  }

  clearCache(): void {
    this.storage.clear();
  }
}

// const localStorageUtil = new StorageUtil(StorageType.Local);
// const sessionStorageUtil = new StorageUtil(StorageType.Session);

// export { localStorageUtil, sessionStorageUtil };
