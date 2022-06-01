
export const startFetch = (type: string) => () => ({
   type: `FETCH_START_${type}`
})

export const failFetch = (type: string) => (err: { message: string, content: Error }) => ({
   type: `FETCH_FAIL_${type}`,
   payload: err
})

export const successFetch = <T>(type: string) => (res: T) => ({
   type: `FETCH_SUCCESS_${type}`,
   payload: res
})

export const successPayload = <T>(type: string, key = "payload") => (payload: T) => ({
   type: type,
   [key]: payload
})