import {  useState,  ChangeEvent, MouseEvent, FC, Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDidMountEffect } from "../../customHooks/useDidMountEffect";
import { Destination } from "../../generalTypes/apiResponse";
import { FETCH_START} from "../../state/actions/actionTypes";
import { Store } from "../../state/types";
import { DestinationsHints } from "./components/DestinationsHints";
import { BrowserInputStyled, InputButtonStyled, DestinationsBrowserStyled} from "./styles/destinationBrowserStyle";


export interface DestinationBrowser{
    destinations: Destination[] | undefined;
    setShowPanel?: Dispatch<SetStateAction<boolean>>
  }

export const DestinationBrowser: FC<DestinationBrowser> = (props) => {

    const [filtered, setFiltered] = useState<Destination[]>([]);
    const [inputTypedValue, setInputTypedValue] = useState<string>("");
    const [destination, setDestinastion] = useState<string>("");
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [cachedDestinations, setCachedDestinations] = useState(() => {
        const storedName = localStorage.getItem("destinationsName") as string;
        const storedRegion = localStorage.getItem("destinationsRegion") as string;
        let name = "";
        let region = "";
        if(storedName){
            name = JSON.parse(storedName);
            region = JSON.parse(storedRegion); 
        }
        return { name, region } ;
    });

    useDidMountEffect(() => dispatch({type: FETCH_START.DEST, name: destination}), [destination]);

    const addToCached = (cacheDestination: string) => {
        const storedWithNextName = cachedDestinations.name += `, ${cacheDestination}`;        
        const destWithCountry = props.destinations?.find(value => value.name === cacheDestination); 
        const storedWithNextRegion = cachedDestinations.region += `, ${destWithCountry?.country}`;

        localStorage.setItem("destinationsRegion", JSON.stringify(storedWithNextRegion));  
        localStorage.setItem("destinationsName", JSON.stringify(storedWithNextName));

        setCachedDestinations(() => ({ name: storedWithNextName, region: storedWithNextRegion }))
    }

    const handleSearchClick = (e: MouseEvent<HTMLElement>): void => { 
        if(inputTypedValue.length < 1) return;
        const valueCapitalized: string = inputTypedValue.replace(/^./, inputTypedValue[0].toUpperCase());    
        const destination: string =  valueCapitalized;  

        setDestinastion(destination);

        const isContent = /[a-zA-Z]/.test(destination);
        if(!isContent || cachedDestinations.name.includes(destination)) return;
        addToCached(destination)
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
        const filtered: Destination[] = props.destinations
            .filter(pickIfMatch)
            .slice(0, 30);               
        setFiltered(filtered);      
    } 

    const handleInputFocus = () =>  setInputFocused(!inputFocused);

    const createCachedDestObj = () => {
        const cachedDestNameList: string[] = cachedDestinations.name.split(","); 
        const cachedDestRegionList: string[] = cachedDestinations.region.split(","); 
        const cachedDestObjList = [];

        for(let i=0; i<=cachedDestNameList.length; i++){
            if(cachedDestNameList[i]?.length > 1){     
                cachedDestObjList.push({ name: cachedDestNameList[i], country: cachedDestRegionList[i] })
            }
        }

        return cachedDestObjList;
    }

    return (
        <DestinationsBrowserStyled changeBorder={false}> 
            <BrowserInputStyled 
                  id="browserInput"
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  value={inputTypedValue}
            />       
            <InputButtonStyled handleClick={handleSearchClick}>search</InputButtonStyled>
            <DestinationsHints
                setInputTypedValue={setInputTypedValue}
                setFiltered={setFiltered}
                filtered={filtered}
                cachedValues={createCachedDestObj()}
                showCachedList={inputFocused}
            />
        </DestinationsBrowserStyled>
    )
}
 
