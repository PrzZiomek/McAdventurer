import {  useState,  ChangeEvent, MouseEvent, FC, Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Search  from "@material-ui/icons/Search"

import { useDidMountEffect } from "../../customHooks/useDidMountEffect";
import { Destination } from "../../generalTypes/apiResponse";
import { FETCH_START} from "../../state/actions/actionTypes";
import { DestinationsHints } from "./components/DestinationsHints";
import { pickIfMatch } from "./helpers/pickIfMatch";
import { BrowserInputStyled, InputButtonStyled, DestinationsBrowserStyled} from "./styles/destinationBrowserStyle";
import { IconButtonWithTooltip } from "../../ui/iconButton/IconButtonWithTooltip";


type CachedDestinations = {
    name: string;
    country: string;
}[]

export interface DestinationBrowser{
    destinations: Destination[] | undefined;
    setShowPanel?: Dispatch<SetStateAction<boolean>>;
    device: "mobile" | "desktop";
  }

export const DestinationBrowser: FC<DestinationBrowser> = (props) => {

    const [filtered, setFiltered] = useState<Destination[]>([]);
    const [inputTypedValue, setInputTypedValue] = useState<string>("");
    const [destination, setDestinastion] = useState<string>("");
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [filteredCached, setFilteredCached] = useState<CachedDestinations>([]);
    const [currentCachedList, setCurrentCachedList] = useState<CachedDestinations>([]);
    const [cachedDestinations, setCachedDestinations] = useState(getLocalStorageData);

    useDidMountEffect(() => dispatch({type: FETCH_START.DEST, name: destination}), [destination]);
    
    useEffect(() => {
        const cachedList = filteredCached.length ? filteredCached : createCachedDestObj();
        setCurrentCachedList(cachedList); 
    }, [filteredCached.length])

    function getLocalStorageData() {
        const storedName = localStorage.getItem("destinationsName") as string;
        const storedRegion = localStorage.getItem("destinationsRegion") as string;
        let name = "";
        let region = "";
        if(storedName){
            name = JSON.parse(storedName);
            region = JSON.parse(storedRegion); 
        }
        return { name, region } ;
    }
    // to do: make the custom hook out of caching functionality 
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

        const filtered: Destination[] = props.destinations
            .filter(pickIfMatch(value))
            .slice(0, 30);               
        setFiltered(filtered);      

        const filteredCached  = createCachedDestObj()
            .map(dest => ({ ...dest,  name: dest.name.trim()}))
            .filter(pickIfMatch(value))
            .slice(0, 30);            
        setFilteredCached(filteredCached);   
    } 

    const handleInputFocus = () =>  setInputFocused(!inputFocused);

    const handleInputClick = () => setInputFocused(true);

    const createCachedDestObj = (): CachedDestinations => {
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
            <form action="post" role="search">
                <BrowserInputStyled 
                    id="search_input"
                    type="search"
                    name="search"
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    value={inputTypedValue}
                    onClick={handleInputClick}
                    placeholder="Where you wanna go?"
                />      
                <IconButtonWithTooltip
                    icon= {<Search/>} 
                    onClick={handleSearchClick}
                    title="Search"
                 />
            </form>
            <DestinationsHints
                setInputTypedValue={setInputTypedValue}
                setFiltered={setFiltered}
                filtered={filtered}
                cachedValues={currentCachedList}
                showCachedList={inputFocused}
                setShowCachedList={setInputFocused}
            />
        </DestinationsBrowserStyled>
    )
}
 
