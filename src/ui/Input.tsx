import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler } from "react";

interface Props{
    className?: string;
    color?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    visibleText?: boolean;
    handleEnterClick?: KeyboardEventHandler<HTMLInputElement>;
    type?: string;
}

export const Input: FC <Props> = (props) => (
    <input 
        type="text"
        onChange={props.handleChange}
        className={props.className}
        onKeyDown={props.handleEnterClick}
     />
)