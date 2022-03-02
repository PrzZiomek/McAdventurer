let hooks: unknown[][] = [];
let id = 0;

export function myUseEffect(cb: Function, depArray: [unknown]) {
    const oldDepths = hooks[id];
    let hasChanged = true;
    if(oldDepths){
        hasChanged = depArray.some((dep,i) => !Object.is(dep, oldDepths[i]))
    } 
    if(hasChanged) cb();
    hooks[id] = depArray;
}