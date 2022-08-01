import { FC } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";


interface ArticleProps extends HtmlElementProps{
}

export const Article: FC<ArticleProps> = (props) => (
   <article 
       id={props.id}
       className={props.className}
       onClick={props.onClick}
       role={props.role}
   > 
     {props.children}
   </article>
)