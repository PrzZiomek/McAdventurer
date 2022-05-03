
export const isNotNumber = (val: number | string | null | undefined): boolean => {
   return (!val || isNaN(val as any));
} 