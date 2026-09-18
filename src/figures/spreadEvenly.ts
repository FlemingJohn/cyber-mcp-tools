export function spreadEvenly<Value>(values: Value[], count: number): Value[] {
  if (values.length <= count) return values;
  const picked: Value[] = [];
  for (let index = 0; index < count; index += 1) {
    const at = Math.round((index * (values.length - 1)) / (count - 1));
    const value = values[at];
    if (value !== undefined) picked.push(value);
  }
  return picked;
}
