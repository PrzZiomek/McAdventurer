import { ChangeEventHandler, FC } from "react";

interface Props{
    className?: string;
    color?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    visibleText: boolean;
}

export const Input: FC <Props> = (props) => (
    <input type="text" onChange={props.handleChange} className={props.className}/>
)