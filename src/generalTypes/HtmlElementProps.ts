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
   /** ARIA attribiute to tell the screen readers what role does the element serve  */
   role?: string;
   /** ARIA attribiute to tell the screen readers what is the text of element */
   ariaLabel?: string;
   /** reference for js or form  */
   name?: string;
   /** ARIA attribiute to reference an element to other elements associated with */
   ariaLabelledBy?: string;
   /** ARIA attribiute TO indicate if controlled element is expanded or collapsed, or its childs are displayed or hidden. */
   ariaExpanded?: boolean;
   /** ref to the DOM node */
   actualRef?: React.LegacyRef<HTMLElement>
} 