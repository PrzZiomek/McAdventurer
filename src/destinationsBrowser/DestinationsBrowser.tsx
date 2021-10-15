import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent } from "react";
import { InputText } from "./components/InputText";
import { BrowserInput, InputButton, BrowserWrapper} from "./styles/destinationBrowserStyle";

interface DestinationBrowserProps{
    countryNames: string[];
}

interface SetPropositionValue{
    filtered: string;
    typed: string;
    letterNumber: number
}


export const DestinationBrowser: FC<DestinationBrowserProps> = (props) => {

    const [filtered, setCountryName] = useState<string[]>([]);
    const [typed, setTypedValue] = useState<string>("");
    const [completeValue, setInputValue] = useState({
      firstPart: "",
      secondPart: "",
      display: ""
     });

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
        setCountryName(filtered);       
        if(filtered[0]){
            setPropositionValue({
                filtered: filtered[0],
                typed: value,
                letterNumber: caretPosition
            }); 
        } 
    }
        // to develop in the future
    const handleClick = (e: MouseEvent<HTMLElement>) => { 
        const value = e.currentTarget.innerText;
        setCountryName([]);
        setTypedValue(value);
        alert(`selected country: ${value}`);
    }

    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){
            setInputValue({
                firstPart: filtered[0],
                secondPart: "",
                display: "none"
            })
        }
    }

    const setPropositionValue = ({ filtered, typed, letterNumber }: SetPropositionValue) => {
        const firstPart = typed.slice(0, letterNumber);
        const secondPart = filtered.slice(letterNumber, filtered.length);     
        const valToCompare = filtered.toLowerCase().slice(0, letterNumber);      
        const noneIfDifferentValues = firstPart !== valToCompare ? "none" : "inline";    
        setInputValue({ 
            firstPart,
             secondPart, 
             display :noneIfDifferentValues
        })    
     }

    const showInputTextUntilNotMatch = (item: string) => item && <InputText value={completeValue} />;

    return (
        <BrowserWrapper> 
            <BrowserInput 
                className="browserInput"
                visibleText={filtered[0] ? false : true} 
                handleChange={handleChange}
                handleEnterClick={handleEnterClick}
            />
            <InputButton handleClick={handleClick} >search</InputButton>
            { showInputTextUntilNotMatch(filtered[0]) }
        </BrowserWrapper>
    )
}
