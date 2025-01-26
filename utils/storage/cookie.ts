import { BaseStorage } from "./base";

interface CookieOptions {
  expires?: number | Date; // 过期时间（天数或具体日期）
  path?: string; // cookie 路径
  domain?: string; // cookie 域名
  secure?: boolean; // 是否只在 https 下传输
  sameSite?: "Strict" | "Lax" | "None"; // Cookie 的 SameSite 属性
}

export class Cookie extends BaseStorage {
  constructor() {
    super();
  }

  /**
   * 设置 cookie
   * @param name cookie 名称
   * @param value cookie 值
   * @param options 配置选项
   */
  setItem(name: string, value: string, options: CookieOptions = {}): void {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      if (typeof options.expires === "number") {
        const d = new Date();
        d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieStr += `;expires=${d.toUTCString()}`;
      } else if (options.expires instanceof Date) {
        cookieStr += `;expires=${options.expires.toUTCString()}`;
      }
    }

    if (options.path) cookieStr += `;path=${options.path}`;
    if (options.domain) cookieStr += `;domain=${options.domain}`;
    if (options.secure) cookieStr += `;secure`;
    if (options.sameSite) cookieStr += `;samesite=${options.sameSite}`;

    document.cookie = cookieStr;
  }

  /**
   * 获取指定的 cookie
   * @param name cookie 名称
   * @returns cookie 值，如果不存在则返回 null
   */
  getItem(name: string): string | null {
    const cookies = document.cookie.split(";");
    const encodedName = encodeURIComponent(name);

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === encodedName) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  /**
   * 删除指定的 cookie
   * @param name cookie 名称
   * @param options 配置选项（主要用于指定 path 和 domain，确保与设置时一致）
   */
  removeItem(name: string, options: Pick<CookieOptions, "path" | "domain"> = {}): void {
    const opts = {
      ...options,
      expires: new Date(0), // 设置过期时间为过去的时间
    };
    this.setItem(name, "", opts);
  }

  /**
   * 检查指定的 cookie 是否存在
   * @param name cookie 名称
   * @returns 是否存在
   */
  hasItem(name: string): boolean {
    return this.getItem(name) !== null;
  }

  /**
   * 获取所有 cookie
   * @returns 包含所有 cookie 的对象
   */
  getAll(): Record<string, string> {
    const result: Record<string, string> = {};
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      if (cookie.trim()) {
        const [name, value] = cookie.trim().split("=");
        result[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }
    return result;
  }

  /**
   * 清除所有 cookie
   * @param options 配置选项（主要用于指定 path 和 domain，确保与设置时一致）
   */
  clear(options: Pick<CookieOptions, "path" | "domain"> = {}): void {
    const cookies = this.getAll();
    for (const name of Object.keys(cookies)) {
      this.removeItem(name, options);
    }
  }
}

export default Cookie;
