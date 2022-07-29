import { FC, MouseEventHandler } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";

interface ButtonProps extends HtmlElementProps{ 
    showPanel?: boolean;
}

export const Button: FC <ButtonProps> = (props) => (
    <button className={props.className} onClick={props.onClick}> {props.children} </button>
)