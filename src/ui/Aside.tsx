import { FC } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";


interface AsideProps extends HtmlElementProps{
   showPanel?: boolean;
}

export const Aside: FC<AsideProps> = (props) => (
   <aside 
       id={props.id}
       className={props.className}
       onClick={props.onClick}
       role={props.role}
   > 
     {props.children}
   </aside>
)