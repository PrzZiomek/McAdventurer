import { FC } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";


interface SectionProps extends HtmlElementProps{
   showPanel?: boolean;
}

export const Section: FC<SectionProps> = (props) => (
   <section 
       id={props.id}
       className={props.className}
       onClick={props.onClick}
       role={props.role}
   > 
     {props.children}
   </section>
)