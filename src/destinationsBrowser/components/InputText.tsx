import { FC } from "react";
import { InputTextSpan, InputTextWrapper } from "../styles/destinationBrowserStyle";


interface InputTextValue{
    firstPart: string;
    secondPart: string; 
    display: string;
}

export const InputText: FC<{ value: InputTextValue }> = ({ value }) => (
    <InputTextWrapper> 
        <InputTextSpan textTransform="capitalize">{value.firstPart}</InputTextSpan>
        <InputTextSpan display={value.display}>{value.secondPart}</InputTextSpan> 
    </InputTextWrapper> 
)