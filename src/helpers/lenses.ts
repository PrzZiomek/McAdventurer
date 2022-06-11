type obj = { [key: string]: any };

const lensProp = (prop: string) => ({

  get: (store: obj) => store[prop],

  set: (value: unknown, store: obj) => ({
    ...store,
    [prop]: value
  })

});

export const lensSet = (key: string, value: unknown) => (store: obj) => lensProp(key).set(value, store);

export const lensGet = (key: string) => (store: obj) => lensProp(key).get(store);
