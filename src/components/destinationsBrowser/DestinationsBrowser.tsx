import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { callApiForDestination } from "../../api/callApiForDestination";
import { useDidMountEffect } from "../../customHooks/useDidMountEffect";
import { DestinationNameAndPos } from "../../dataModels/types";
import { startFetchDestAction } from "../../state/actions/fetchDestinationActions";
import { InputText } from "./components/InputText";
import { BrowserInput, InputButton, BrowserWrapper} from "./styles/destinationBrowserStyle";

interface DestinationBrowserProps{
    destinations: DestinationNameAndPos[] | undefined;
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        const caretPosition = input.selectionStart as number;
        const value = input.value.toLowerCase();
        setInputTypedValue(value);
        if(!props.destinations?.length) return;   

        const pickIfMatch = (name: string): boolean | undefined => { 
            for(let i = 30; i > 0; i--){
                if(value.length > i){    
                    const piece = i + 1;
                    return name.toLowerCase().slice(0, piece) === value.slice(0, piece);
                } 
            }        
        };     

        const filtered: string[] = props.destinations
            .map(dest => dest.name)
            .filter(pickIfMatch);        //console.log(filtered);        

        setCountryName(filtered);       
        if(filtered[0]){
            setPropositionValue({
                filtered: filtered[0],
                typed: value,
                letterNumber: caretPosition
            }); 
        } 
    }

    const handleClick = (e: MouseEvent<HTMLElement>): void => { 
        if(inputTypedValue.length < 1) return;
        const valueCapitalized: string = inputTypedValue.replace(/^./, inputTypedValue[0].toUpperCase());    
        const destination: string =  valueCapitalized;  //filtered[0] || inputTypedValue;      
        setDestinastion(destination); //console.log("typed: ",destination );
        
        setCountryName([]);
    }

    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === "Enter" || e.code === "ArrowRight"){
            setInputValue({
                firstPart: filtered[0],
                secondPart: "",
                display: "none"
            });  
        }
    }

    const setPropositionValue = ({ filtered, typed, letterNumber }: SetPropositionValue): void => {
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
                id="browserInput"
                visibleText={filtered[0] ? false : true} 
                handleChange={handleChange}
                handleEnterClick={handleEnterClick}
            />
            <InputButton handleClick={handleClick} >search</InputButton>
            { showInputTextUntilNotMatch(filtered[0]) }
        </BrowserWrapper>
    )
}
 
