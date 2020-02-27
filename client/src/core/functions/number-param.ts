export function numberParam(param: string): number {
  const num = Number(param);
  if (Number.isNaN(num)) {
    return 1;
  } else {
    return Math.ceil(num);
  }
}
