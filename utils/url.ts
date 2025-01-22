class URLParams {
  private get url() {
    return new URL(window.location.href);
  }

  private get searchParams() {
    return new URLSearchParams(this.url.search);
  }

  get(key: string): string {
    return this.searchParams.get(key) || "";
  }

  getAll(): Record<string, string> {
    return Object.fromEntries(this.searchParams.entries());
  }

  set(key: string, value: string): URLSearchParams {
    const searchParams = this.searchParams;
    searchParams.set(key, value);

    this.updateUrl(searchParams);
    return searchParams;
  }

  delete(key: string): URLSearchParams {
    const searchParams = this.searchParams;
    searchParams.delete(key);

    this.updateUrl(searchParams);
    return searchParams;
  }

  updateUrl(params: URLSearchParams): void {
    window.history.replaceState(null, "", this.url.toString());
  }
}

export default new URLParams();
