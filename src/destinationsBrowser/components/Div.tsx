import { FC } from "react";

interface Props{
    className?: string;
    color?: string;
}

export const Div: FC <Props> = (props) => (
    <div className={props.className}> {props.children} </div>
)