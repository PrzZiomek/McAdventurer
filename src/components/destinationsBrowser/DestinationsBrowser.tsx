import {  useState,  ChangeEvent, MouseEvent, FC } from "react";
import { useDispatch } from "react-redux";

import { callApiForDestination } from "../../api/callApiForDestination";
import { useDidMountEffect } from "../../customHooks/useDidMountEffect";
import { DestinationNameAndPos } from "../../generalTypes/apiResponse";
import { I } from "../worldMap/models/types/componentsInterfaces";
import { DestinationsHints } from "./components/DestinationsHints";
import { BrowserInputStyled, InputButtonStyled, DestinationsBrowserStyled} from "./styles/destinationBrowserStyle";


export const DestinationBrowser: FC<I.DestinationBrowser> = (props) => {

    const [filtered, setFiltered] = useState<DestinationNameAndPos[]>([]);
    const [inputTypedValue, setInputTypedValue] = useState<string>("");
    const [destination, setDestinastion] = useState<string>("");
    const [changeBorder, setChangeBorder] = useState(false); 
    const dispatch = useDispatch();

    useDidMountEffect(() => dispatch(callApiForDestination(destination)), [destination])

    const handleSearchClick = (e: MouseEvent<HTMLElement>): void => { 
        if(inputTypedValue.length < 1) return;
        const valueCapitalized: string = inputTypedValue.replace(/^./, inputTypedValue[0].toUpperCase());    
        const destination: string =  valueCapitalized;  
        setDestinastion(destination);
        setChangeBorder(true);
    }
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const input = e.currentTarget;
        const value = input.value.toLowerCase();
        setInputTypedValue(value);
        if(props.destinations === undefined) return;   
    
        const pickIfMatch = ({name}: {name: string}): boolean | undefined => { 
            for(let i = 30; i > 0; i--){
                if(value.length > i){    
                    const piece = i + 1;        
                    return name.toLowerCase().slice(0, piece) === value.slice(0, piece);
                } 
            }        
        };     
    
        const filtered: DestinationNameAndPos[] = props.destinations
            .filter(pickIfMatch)
            .slice(0, 30);              
    
        setFiltered(filtered);      
        // console.log("props.destinations, ", props.destinations);
    }
      
    return (
        <DestinationsBrowserStyled changeBorder={changeBorder}> 
            <BrowserInputStyled 
                  id="browserInput"
                  onChange={handleChange}
                  value={inputTypedValue}
            />       
            <InputButtonStyled handleClick={handleSearchClick}>search</InputButtonStyled>
            <DestinationsHints
                setInputTypedValue={setInputTypedValue}
                setFiltered={setFiltered}
                filtered={filtered}
            />
        </DestinationsBrowserStyled>
    )
}
 
