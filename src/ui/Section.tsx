import { FC } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";


interface SectionProps extends HtmlElementProps{
   showPanel?: boolean;
   ariaLabelledBy?: string;
}

export const Section: FC<SectionProps> = (props) => (
   <section 
       id={props.id}
       className={props.className}
       onClick={props.onClick}
       role={props.role}
       aria-labelledby={props.ariaLabelledBy}
       ref={props.actualRef}
   > 
     {props.children}
   </section>
)