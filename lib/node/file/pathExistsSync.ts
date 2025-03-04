import { accessSync } from "fs";

function pathExistsSync(path: string) {
  try {
    accessSync(path);
    return true;
  } catch {
    return false;
  }
}

export default pathExistsSync;
