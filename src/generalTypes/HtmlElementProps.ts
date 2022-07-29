import { MouseEventHandler } from "react";

 
export interface HtmlElementProps{
   /** Required by default */
   className?: string;     
   /** identifier */
   id?: string;
   /** to set color if need be */
   color?: string;   
   /** used with clickable elements */                                                                      
   onClick?: MouseEventHandler<HTMLElement>;
   /** ARIA attribiute, to tell the screen readers what role does the element serve  */
   role?: string
}