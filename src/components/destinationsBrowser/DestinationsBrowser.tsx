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
    const [cachedDestinations, setCachedDestinations] = useState<{name: string, region: string }>(() => {
        const storedName = localStorage.getItem("destinationsName");
        const storedRegion = localStorage.getItem("destinationsRegion") as string;
        let name = "";
        let region = "";
        if(storedName){
            name = JSON.parse(storedName);
            region = JSON.parse(storedRegion);
        } 
        return { name, region } ;
    });
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const dispatch = useDispatch();

    useDidMountEffect(() => dispatch({type: FETCH_START.DEST, name: destination}), [destination]);

    const destinationData = useSelector((state: Store) => { 
        if(state.getDestination.loading !== false) return;
        return state.getDestination.data;                                                                                                                                    //setDestination(state.getDestination.destination)  
    })

    useEffect(() =>{
        if(!destinationData?.content) return;
        const updatedRegion = cachedDestinations.region += destinationData?.content;
        setCachedDestinations({ name: cachedDestinations.name, region: updatedRegion})
    }, [destinationData?.content])

    const handleSearchClick = (e: MouseEvent<HTMLElement>): void => { 
        if(inputTypedValue.length < 1) return;
        const valueCapitalized: string = inputTypedValue.replace(/^./, inputTypedValue[0].toUpperCase());    
        const destination: string =  valueCapitalized;  
        setDestinastion(destination);
        if(cachedDestinations.name.includes(destination)) return;
        const storedWithNextName = cachedDestinations.name += `, ${destination}`;       console.log("destinationData", destinationData);    
      //  const storedWithNextRegion = cachedDestinations.region += `, ${destinationData?.content}`;
        setCachedDestinations({ name: storedWithNextName, region: cachedDestinations.region }); 
        localStorage.setItem("destinationsName", JSON.stringify(storedWithNextName));
        localStorage.setItem("destinationsRegion", JSON.stringify(cachedDestinations.region));
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

    const handleInputFocus = () => setInputFocused(!inputFocused);
 
    const cachedDestNameList: string[] = cachedDestinations.name.split(","); console.log("cachedDestNameList", cachedDestNameList);    
    const cachedDestRegionList: string[] = cachedDestinations.region.split(",");
    const cachedDestObjList = cachedDestNameList.reduce((acc:{ name: string, country: string }[], item, i) => {
        acc.push({ name: item, country: cachedDestRegionList[i] });
        return acc
    }, []);
    console.log("cachedDestObjList", cachedDestObjList);  
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
                cachedValues={cachedDestObjList}
            />
        </DestinationsBrowserStyled>
    )
}
 
