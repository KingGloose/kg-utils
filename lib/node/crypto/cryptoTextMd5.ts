import * as crypto from "crypto";

function cryptoTextMd5(text: string) {
  return crypto.createHash("md5").update(text).digest("hex");
}

export default cryptoTextMd5;
