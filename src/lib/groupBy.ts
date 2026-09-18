export function groupBy<Value>(
  values: Value[],
  getKey: (value: Value) => string,
): Map<string, Value[]> {
  const grouped = new Map<string, Value[]>();
  for (const value of values) {
    const key = getKey(value);
    const existing = grouped.get(key);
    if (existing === undefined) grouped.set(key, [value]);
    else existing.push(value);
  }
  return grouped;
}
