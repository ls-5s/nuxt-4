

export function sum() {
  let a = 1;
  const add = (b: number, c: number) : number => {
    return b + c;
  }
  
  return {
    a,
    add
  }
}