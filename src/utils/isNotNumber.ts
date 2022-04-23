
export const isNotNumber = (val: number | string): boolean => {
   return (!val || isNaN(val as any));
} 