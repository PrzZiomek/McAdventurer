export const pipeline = (...fns: Function[]) => (x: unknown) => fns.reduce((acc,fn) => fn(acc), x);
