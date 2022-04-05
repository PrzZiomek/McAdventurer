import CSS from "csstype";
import { CSSProperties } from "styled-components";


interface StyleableDomElement extends HTMLElement{
   style: { [key:string]: CSSProperties | string | number  } & CSSStyleDeclaration  
 }
 
 
 export function setStyles(element: StyleableDomElement, styles: { [key: string]: keyof CSS.Properties }){
   for(const s in styles) {
      element.style[s] = styles[s];
   } 
   return element;
 }
 