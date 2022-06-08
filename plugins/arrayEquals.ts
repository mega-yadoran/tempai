export const arrayEquals = (a:Array<any>, b:Array<any>):boolean => {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}