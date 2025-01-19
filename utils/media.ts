export function getVideoBlobMetadata(fileUrl: string): Promise<{
  posterBase64: string;
  posterFile: File;
  width: number;
  height: number;
  duration: string;
}> {
  return new Promise((resolve, reject) => {
    const videoEl = document.createElement("video");
    videoEl.src = fileUrl;
    videoEl.autoplay = true;
    videoEl.muted = true;

    videoEl.addEventListener("canplay", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("canvas context error"));
        return;
      }

      context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("create blob error"));
          return;
        }

        resolve({
          posterBase64: canvas.toDataURL(),
          posterFile: new File([blob], "poster.png", { type: "image/png" }),
          width: videoEl.videoWidth,
          height: videoEl.videoHeight,
          duration: videoEl.duration.toFixed(2),
        });
      }, "image/png");
    });

    videoEl.addEventListener("error", (event) => {
      reject(new Error(`video error: ${event}`));
    });
  });
}
