
export const startFetchDestAction = () => ({
   type: `FETCH_START`
})

export const failFetchDestAction = (res) => ({
   type: `FETCH_FAIL`,
   payload: res
})

export const successFetchDestAction = (res) => ({
   type: `FETCH_SUCCESS`,
   payload: res
})