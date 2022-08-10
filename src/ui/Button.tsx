import { FC, MouseEventHandler } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";

interface ButtonProps extends HtmlElementProps{ 
    showPanel?: boolean;
    ariaControls?: string;
}

export const Button: FC <ButtonProps> = (props) => (
    <button
         className={props.className} 
         onClick={props.onClick}
         aria-controls={props.ariaControls}
         aria-expanded={props.ariaExpanded}
    > 
        {props.children} 
    </button>
)