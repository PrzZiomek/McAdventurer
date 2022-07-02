
export const fetch = (...args: unknown[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const fetchRes = async (url: string) => await fetch(url).then(res => res.json())   