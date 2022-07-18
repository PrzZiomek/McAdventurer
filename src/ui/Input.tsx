import { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

interface Props{
    className?: string;
    color?: string;
    onChange: ChangeEventHandler;
    visibleText?: boolean;
    handleEnterClick?: KeyboardEventHandler;
    type?: string;
    id?: string;
    value?: string;
    onFocus?: FocusEventHandler;
    handleClick?: MouseEventHandler;
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
        onFocus={props.onFocus}
        onClick={props.handleClick}
     />
)