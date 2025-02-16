// 处理 URL 查询参数的获取、设置和删除
class urlParams {
  // 获取当前页面的 URL 对象
  private get url(): URL {
    return new URL(window.location.href);
  }

  // 获取当前 URL 的查询参数对象
  private get searchParams(): URLSearchParams {
    return new URLSearchParams(this.url.search);
  }

  /**
   * 获取指定键的查询参数值
   * @param {string} key - 查询参数的键名
   * @returns {string} 对应的查询参数值，如果不存在则返回空字符串
   */
  get(key: string): string {
    return this.searchParams.get(key) || "";
  }

  /**
   * 获取所有查询参数并转换为对象格式
   * @returns {Record<string, string>} 查询参数键值对对象
   */
  getAll(): Record<string, string> {
    return Object.fromEntries(this.searchParams.entries());
  }

  /**
   * 设置指定键的查询参数值，并更新 URL
   * @param {string} key - 要设置的查询参数键
   * @param {string} value - 要设置的查询参数值
   * @returns {URLSearchParams} 更新后的查询参数对象
   */
  set(key: string, value: string, preUpdateCb = () => {}): URLSearchParams {
    const searchParams = this.searchParams;
    searchParams.set(key, value);
    preUpdateCb(); // 更新URL前回调函数
    this.updateUrl(searchParams);
    return searchParams;
  }

  /**
   * 删除指定的查询参数，并更新 URL
   * @param {string} key - 要删除的查询参数键
   * @returns {URLSearchParams} 更新后的查询参数对象
   */
  delete(key: string): URLSearchParams {
    const searchParams = this.searchParams;
    searchParams.delete(key);

    this.updateUrl(searchParams);
    return searchParams;
  }

  /**
   * 更新浏览器地址栏的 URL，而不刷新页面
   * @param {URLSearchParams} params - 更新后的查询参数对象
   */
  private updateUrl(params: URLSearchParams): void {
    const newUrl = `${this.url.origin}${this.url.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }

  /**
   * 将对象转换为 URL 查询参数字符串
   * @param {Record<string, string>} obj - 要转换的对象，键值对都必须是字符串
   * @returns {string} 返回格式化后的查询参数字符串（不包含起始的'?'）
   *
   * @example
   * // 基础使用
   * const params = { name: 'john', age: '25' };
   * objectToStrParams(params); // 返回: 'name=john&age=25'
   *
   * // 空对象
   * objectToStrParams({}); // 返回: ''
   */
  private objectToStrParams(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
}

export default urlParams;
