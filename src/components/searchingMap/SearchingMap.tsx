import React, { Dispatch, MouseEvent, useEffect, useState } from "react"

import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../state/types";
import { ErrorPanel } from "./styles/errorPanel";
import { Destination, DestinationNameAndPos, WikiDestination } from "../../dataModels/types";
import { startFetchDestListAction } from "../../state/actions/fetchDestinationActions";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void

type numbOrStr = number | string;

export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const [error, setErrorFlag] = useState({isError: false, msg: new Error()});
    const [destListError, setDestListErrorFlag] = useState({isError: false, msg: new Error()});
    const [mapParams, setMapParams] =  useState<{lat: numbOrStr, lng: numbOrStr  }>({
        lat: 0,
        lng: 0  
    });

    const dispatch: Dispatch<any> = useDispatch();

    const destinationList: DestinationNameAndPos[] | undefined = useSelector((state: Store) => {  
        const stateErr = state.getDestinationList.error; 

        if(stateErr){
            !destListError.isError && setDestListErrorFlag({isError: true, msg: stateErr}); 
            return;
        }     

        const destList = state.getDestinationList.destinations; //console.log("getDestinationList ", state.getDestinationList);  
        return destList;        
    })
 
    const destination: WikiDestination | undefined = useSelector((state: Store) => { 
        const stateErr = state.callApiReducer.error;  

        if(stateErr){
            !error.isError && setErrorFlag({isError: true, msg: stateErr}); 
            return;
        }         
        const destination = state.callApiReducer.destination;  console.log("desttrttttt", destination);        
        return destination
    })

    useEffect(() => { 
        dispatch(startFetchDestListAction())
    }, [])
  
    useEffect(() => { 
        if(!destination) return;  console.log("selected destination: ", destination);
        const { coordinates } = destination;
        let lat: numbOrStr = coordinates?.lat;
        let lng: numbOrStr = coordinates?.lng;  

        if((isNotNumber(coordinates.lat) || isNotNumber(coordinates.lng)) && destinationList){                                                                                                                                                                                                                                                         //if((!castedDestination.lat || (castedDestination as Destination).lat === "unset") ||                                                                                                                  // (!castedDestination.lng || (castedDestination as Destination).lng === "unset")){
            const dest = destinationList.find(dest => dest.name === destination.name);
            if(!dest) return;
            const latNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;         //  (!castedDestination.lng || (castedDestination as Destination).lng === "unset")){ 
            const lngNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;        //(!dest?.lng || typeof dest?.lng === "string") ? 0 : dest?.lng;
            lat =  latNumb;
            lng = lngNumb; 
        }

        setMapParams({
            lat,
            lng,
        })         
    }, [destination?.name]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const pageContentOrErrorStatement = () => {
        if(!error.isError){
            const mapParamsAsNumbers = { lat: +mapParams.lat, lng: +mapParams.lng };
            if(destListError.isError){ 
                alert("err!"); 
                console.log("api communication error: ", destListError.msg);       
            } 
             return (  
                <MapWrapper className="mapWrapper">
                    <Panel 
                        destinations={destinationList} 
                    />
                    <WorldMap
                        theme={theme}
                        setMapParams={setMapParams}
                        mapParams={mapParamsAsNumbers}
                    />
                    <MapThemesMenu onChangeTheme={onChangeTheme}/>
                </MapWrapper>
             )
        }else{ 
            console.log("error message: ", error.msg);
            return (
                <ErrorPanel>
                    <h1>Błąd serwera!</h1>
                </ErrorPanel>
            )
        }
    }
     
    return  (
        <>
          {pageContentOrErrorStatement()}
       </>
     )
}





let hooks: [][] = [];
let id = 0;

function myUseEffect(cb: Function, depArray: [{} | undefined]) {
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