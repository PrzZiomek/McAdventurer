import { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../helpers/storage';
import {data as themes} from "../styles/themes/schema";
 
export function myUseTheme<T>() { 
   try{
      const [theme, setTheme] = useState(themes?.day);
      const [themeLoaded, setThemeLoaded] = useState(false);
      
      const setMode = (mode: JSON) => {
         setToLocalStorage("theme", mode);
         setTheme(mode)
      }
   
      useEffect(() => {
         const localTheme = getFromLocalStorage('theme');
         localTheme ? setTheme(localTheme) : setTheme(themes.default.data.day);
         setThemeLoaded(true);
       }, []);
   
       return [ theme, themeLoaded, setMode ];
   }
   catch(err){
      console.log("error when setting stylde component:", err);     
   }
 }