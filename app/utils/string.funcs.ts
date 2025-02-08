export function truncateString(str: string, slice: number) {
  if (str.length > slice) {
    return str.slice(0, slice) + "...";
  }
  return str;
}
