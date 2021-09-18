import {  useState,  ChangeEvent, MouseEvent, FC } from "react";
import { BrowserInput, InputButton, InputTextWrapper, BrowserWrapper, InputTextSpan } from "./styles/destinationBrowserStyle";

interface DestinationBrowserProps{
    countryNames: string[];
}

interface InputTextValue{
    firstPart: string;
    secondPart: string; 
    noneIfDifferentValues: string;
}


export const DestinationBrowser: FC<DestinationBrowserProps> = (props) => {

    const [filtered, getCountryName] = useState<string[]>([""]);
    const [typed, getTypedValue] = useState<string>("");
    const [letterNumber, letterCounter] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const caretPosition = input.selectionStart as number;
        const value = input.value.toLowerCase();
        const pickIfMatch = (name: string) =>{ 
            if(value.length > 2){
                return name.toLowerCase().slice(0,3) === value.slice(0,3);
            }       
        };     
       const filtered = props.countryNames.filter(pickIfMatch);       
       letterCounter(caretPosition);
       getCountryName(filtered);
       getTypedValue(value);
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const value = e.currentTarget.innerText;
        getCountryName([]);
        getTypedValue(value);
        alert(`selected country: ${value}`);
    }

    const setPropositionValue = () => {
        const firstPart = typed.slice(0, letterNumber);
        const secondPart = filtered[0].slice(letterNumber, filtered[0].length); 
        const valToCompare = filtered[0].toLowerCase().slice(0, letterNumber);      
        const noneIfDifferentValues = firstPart !== valToCompare ? "none" : "inline";        
        return{
            firstPart,
            secondPart,
            noneIfDifferentValues
        }      
    }

    const InputText: FC<{ value: InputTextValue }> = ({ value }) => (
        <InputTextWrapper> 
            <InputTextSpan textTransform="capitalize">{value.firstPart}</InputTextSpan>
            <InputTextSpan display={value.noneIfDifferentValues}>{value.secondPart}</InputTextSpan> 
        </InputTextWrapper> 
    )

    return (
        <BrowserWrapper> 
            <BrowserInput visibleText={filtered[0] ? false : true} handleChange={handleChange}/>
            <InputButton handleClick={handleClick} >search</InputButton>
            {filtered[0] &&  <InputText value={setPropositionValue()}/>}
        </BrowserWrapper>
    )
}
