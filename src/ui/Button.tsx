import { FC, MouseEventHandler } from "react";

interface ButtonProps{
    className?: string;
    color?: string;
    showPanel?: boolean;
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC <ButtonProps> = (props) => (
    <button className={props.className} onClick={props.handleClick}> {props.children} </button>
)