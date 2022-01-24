import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { callApiForDestination } from "../../api/callApiForDestination";
import { useDidMountEffect } from "../../customHooks/useDidMountEffect";
import { InputText } from "./components/InputText";
import { BrowserInput, InputButton, BrowserWrapper} from "./styles/destinationBrowserStyle";

interface DestinationBrowserProps{
    destinations: string[];
   // updateDestinationsSet: Dispatch<SetStateAction<string[]>>
}

interface SetPropositionValue{
    filtered: string;
    typed: string;
    letterNumber: number
}


export const DestinationBrowser: FC<DestinationBrowserProps> = (props) => {

    const [filtered, setCountryName] = useState<string[]>([]);
    const [inputTypedValue, setInputTypedValue] = useState<string>("");
    const [destination, setDestinastion] = useState<string>("");
    const dispatch = useDispatch();
    const [completeValue, setInputValue] = useState({
      firstPart: "",
      secondPart: "",
      display: ""
     });

    useDidMountEffect(() => dispatch(callApiForDestination(destination)), [destination])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const caretPosition = input.selectionStart as number;
        const value = input.value.toLowerCase();
        setInputTypedValue(value);
        const pickIfMatch = (name: string) =>{ 
            if(value.length > 2){    
                return name.toLowerCase().slice(0,3) === value.slice(0,3);
            }       
        };     
        const filtered = props.destinations.filter(pickIfMatch);       
        setCountryName(filtered);       
        if(filtered[0]){
            setPropositionValue({
                filtered: filtered[0],
                typed: value,
                letterNumber: caretPosition
            }); 
        } 
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => { 
        const valueCapitalized = inputTypedValue.replace(/^./, inputTypedValue[0].toUpperCase());    
        const destination =  valueCapitalized;  //filtered[0] || inputTypedValue;      
        setDestinastion(destination);
        setCountryName([]);
    }

    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){
            setInputValue({
                firstPart: filtered[0],
                secondPart: "",
                display: "none"
            });    
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
             display: noneIfDifferentValues
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
 
