import { FC } from "react";

interface Props{
    className?: string;
    color?: string;
    textTransform?: string;
    display?: string;
}

export const Span: FC <Props> = (props) => (
    <span className={props.className}>{props.children}</span>
)