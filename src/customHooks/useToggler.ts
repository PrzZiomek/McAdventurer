import { useCallback, useState } from "react";



export function useToggler(initialState: boolean){

   const [value, setValue] = useState(initialState);

   const toggleValue = () => setValue(!value);

   return [value, toggleValue];

} 