/**
 * 创建一个动画帧控制器，允许启动和停止基于时间的动画。
 *
 * @param animationFn - 一个回调函数，接收一个表示动画进度的参数（范围从 0 到 1）。
 * @param animationTime - 动画的总持续时间（以毫秒为单位）。默认值为 0，表示动画会一直进行直到手动停止。
 * @returns 一个对象，包含两个方法：
 *   - `start`: 启动动画。
 *   - `stop`: 停止动画。
 */
function useAnimationFrame(animationFn: (progress: number) => void, animationTime = 0): { start: any; stop: any } {
  let isFinish = false;

  const start = () => {
    let startTime: number = 0;
    const animation = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / animationTime;
      if (!isFinish && progress <= 1) {
        animationFn(progress);
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const stop = () => {
    isFinish = true;
  };

  return { start, stop };
}

export default useAnimationFrame;
