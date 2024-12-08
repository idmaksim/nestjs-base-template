export function mapStringToSearch<T>(
  where: T,
  excludedValues: string[] = [],
): T {
  if (!where) {
    return {} as T;
  }
  return Object.entries(where).reduce((acc, [key, value]) => {
    if (typeof value === 'string' && !excludedValues.includes(key)) {
      acc[key] = { contains: value.toLowerCase(), mode: 'insensitive' };
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as T);
}
