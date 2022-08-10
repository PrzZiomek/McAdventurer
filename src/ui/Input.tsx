import { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";
import { HtmlElementProps } from "../generalTypes/HtmlElementProps";

interface InputProps extends HtmlElementProps {
    onChange: ChangeEventHandler;
    visibleText?: boolean;
    handleEnterClick?: KeyboardEventHandler;
    type?: string;
    value?: string;
    onFocus?: FocusEventHandler;
    placeholder?: string
    list?: string;
}

export const Input: FC <InputProps> = (props) => (
    <input 
        autoComplete="off"
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        onKeyDown={props.handleEnterClick}
        onFocus={props.onFocus}
        onClick={props.onClick}
        placeholder={props.placeholder}
     />
)