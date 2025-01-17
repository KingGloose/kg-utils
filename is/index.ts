export function isObject(value: object) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}
