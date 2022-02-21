import React, { Dispatch, MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect'
import { createCachedSelector } from 're-reselect';

import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { Store } from "../../state/types";
import { Destination, DestinationNameAndPos, WikiDestination } from "../../dataModels/types";
import { startFetchDestListAction } from "../../state/actions/fetchDestinationActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { deepEqual } from "assert";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void

type numbOrStr = number | string;
type ErrorObject = { isError: boolean, content: Error };
type ErrorName = "getDestinationList" | "getDestination" | "worldMapAPI"
type PartialRecord<K extends string, T> = { [P in K]?: T };

type ErrorCollection = PartialRecord<ErrorName, ErrorObject>


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const dispatch: Dispatch<({ type: string })> = useDispatch();
    const [errors, setError] =  useState<ErrorCollection>({ }); 
    const [destinationList, setDestsList] = useState<DestinationNameAndPos[]>([]);
    const [destination, setDestination] = useState<WikiDestination>()
    const [mapParams, setMapParams] =  useState<{ lat: numbOrStr, lng: numbOrStr }>({
        lat: 0,
        lng: 0  
    });
    
     useSelector((state: Store) => { 
        const stateErr = state.getErrors.error;
        if(stateErr && !errors.worldMapAPI?.isError){
            setError({ worldMapAPI: { isError: true, content: stateErr } });
            return; 
        } 
    }) 

    useSelector((state: Store) => { 
        if(state.getDestinationList.loading !== false || destinationList?.length) return;
        const stateErr = state.getDestinationList.error;         //console.log("getDestinationList", state.getDestinationList);  
        if(stateErr && !errors.getDestinationList?.isError){
            setError({ getDestinationList: { isError: true, content: stateErr } }); 
            return;
        }   
        setDestsList(state.getDestinationList.destinations)                                    
    }) 
 
     useSelector((state: Store) => { 
            if(state.getDestination.loading !== false ||
               destination?.name === state.getDestination.destination.name
               ) return;
             const stateErr = state.getDestination.error;   console.log("dest",destination); 
            if(stateErr && !errors.getDestination?.isError){
                setError({ getDestination: { isError: true, content: stateErr } }); 
                return;
            } setDestination(state.getDestination.destination)  
    })

    myUseEffect(() => { 
        dispatch(startFetchDestListAction()) 
    }, [])
  
    useEffect(() => { 
        if(!destination) return;         
        const { coordinates } = destination;
        let lat: numbOrStr = coordinates?.lat;
        let lng: numbOrStr = coordinates?.lng;  

        if((isNotNumber(coordinates.lat) || isNotNumber(coordinates.lng)) && destinationList){                                                                                                                                                                                                                                                                                                                                                           
            const dest = destinationList.find(dest => dest.name === destination.name);
            if(!dest) return;
            const latNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;        
            const lngNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;      
            lat =  latNumb;
            lng = lngNumb; 
        }

        setMapParams({
            lat,
            lng,
        });     
        
    }, [destination?.name]);  console.log("namw", destination?.name); 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const errorInformation = (): JSX.Element | null => {
        let Information: JSX.Element | null = null;
        const isError: boolean = Object.entries(errors).some(([_, err]) => err.isError);
        if(isError){      
            Information = <ErrorModal />        
            console.log("list of errors: ", errors);
        }; 
        return Information;
    }

    const destList = destinationList?.length ? destinationList : []; 
    
    const mapParamsAsNumbers = { lat: +mapParams.lat, lng: +mapParams.lng };

    return  (
        <>
          {errorInformation()}

          <MapWrapper className="mapWrapper">
                <Panel 
                    destinations={destList} 
                />
                <WorldMap
                    theme={theme}
                    setMapParams={setMapParams}
                    mapParams={mapParamsAsNumbers}
                />
                <MapThemesMenu onChangeTheme={onChangeTheme}/>
          </MapWrapper>
       </>
     )
}





let hooks: [][] = [];
let id = 0;

function myUseEffect(cb: Function, depArray: []) {
    const oldDepths = hooks[id];
    let hasChanged = true;
    if(oldDepths){
        hasChanged = depArray.some((dep,i) => !Object.is(dep, oldDepths[i]))
    } 
    if(hasChanged) cb();
    hooks[id] = depArray;
}


function isNotNumber(val: number | string): boolean{
    return (!val || isNaN(val as any));
} 