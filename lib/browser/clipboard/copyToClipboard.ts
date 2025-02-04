import isSecureContext from "../is/isSecureContext";

function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve(true))
        .catch(() => reject(false));
    } else {
      reject(false);
    }
  });
}

export default copyToClipboard;
