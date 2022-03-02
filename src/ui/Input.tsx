import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler } from "react";

interface Props{
    className?: string;
    color?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    visibleText?: boolean;
    handleEnterClick?: KeyboardEventHandler<HTMLInputElement>;
    type?: string;
    id?: string;
    value?: string;
}

export const Input: FC <Props> = (props) => (
    <input 
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        className={props.className}
        onKeyDown={props.handleEnterClick}
     />
)