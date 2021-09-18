import { FC, MouseEventHandler } from "react";

interface Props{
    className?: string;
    color?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC <Props> = (props) => (
    <button className={props.className} onClick={props.handleClick}> {props.children} </button>
)