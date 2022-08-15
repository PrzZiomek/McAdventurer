import { FC, MouseEventHandler } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";

interface ButtonProps extends HtmlElementProps{ 
    showPanel?: boolean;
    ariaControls?: string;
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC <ButtonProps> = (props) => (
    <button
         className={props.className} 
         onClick={props.onClick}
         aria-controls={props.ariaControls}
         aria-expanded={props.ariaExpanded}
         onMouseEnter={props.onMouseEnter}
         onMouseLeave={props.onMouseLeave}
    > 
        {props.children} 
    </button>
)