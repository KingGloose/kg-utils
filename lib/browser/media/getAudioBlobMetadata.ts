/**
 * 获取音频文件的元数据信息
 * @param {string} fileUrl - 音频文件的URL地址或Blob URL
 * @returns {Promise<{duration: string}>} 返回包含音频时长的Promise对象
 *                                      duration: 音频时长（单位：秒），保留两位小数
 * @example
 * // 示例使用
 * const metadata = await getAudioBlobMetadata('https://example.com/audio.mp3');
 * console.log(metadata.duration); // 输出类似 "123.45"
 *
 * // 或者使用Blob URL
 * const blobUrl = URL.createObjectURL(audioBlob);
 * const metadata = await getAudioBlobMetadata(blobUrl);
 */
function getAudioBlobMetadata(fileUrl: string) {
  const audio = new Audio(fileUrl);
  return new Promise((resolve) => {
    audio.addEventListener("loadedmetadata", () => {
      resolve({
        duration: audio.duration.toFixed(2),
      });
    });
  });
}

export default getAudioBlobMetadata;
