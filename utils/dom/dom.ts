type VisibilityCallback = () => void;

/**
 * 监听页面可见性变化的事件
 *
 * @description
 * 该函数使用 Page Visibility API 来监听页面的可见性状态变化。
 * 当用户切换标签页、最小化窗口或切换到其他应用时会触发相应的回调函数。
 *
 * @param enterCallback - 页面变为可见时的回调函数
 * @param leaveCallback - 页面变为隐藏时的回调函数
 *
 * @returns 返回一个清理函数，调用它可以移除事件监听器
 *
 * @example
 * ```typescript
 * const cleanup = watchPageVisibility(
 *   () => console.log('页面已变为可见'),
 *   () => console.log('页面已隐藏')
 * );
 *
 * // 清理监听器
 * cleanup();
 * ```
 */
export function watchPageVisibility(
  enterCallback: VisibilityCallback = () => {},
  leaveCallback: VisibilityCallback = () => {}
): () => void {
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      enterCallback();
    } else if (document.visibilityState === "hidden") {
      leaveCallback();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // 返回清理函数
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}
