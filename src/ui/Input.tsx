import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler } from "react";

interface Props{
    className?: string;
    color?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    visibleText?: boolean;
    handleEnterClick?: KeyboardEventHandler<HTMLInputElement>;
    type?: string;
    id?: string;
    value?: string;
}

export const Input: FC <Props> = (props) => (
    <input 
        autoComplete="off"
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        onKeyDown={props.handleEnterClick}
     />
)