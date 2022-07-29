import { FC } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";

interface SpanProps extends HtmlElementProps{
    textTransform?: string;
    display?: string;
}

export const Span: FC <SpanProps> = (props) => (
    <span className={props.className}>{props.children}</span>
)