import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../../data/destinations.json";
import destinationsList1  from "../../data/cities.json";
import destinationsList2  from "../../data/cities2.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { store } from "../../state/store";
import { useSelector } from "react-redux";
import { Store } from "../../state/types/store";
import { ErrorPanel } from "./styles/errorPanel";
import { fetchDestinationsList } from "../../api/fetchDestinationsList";
import { Destination } from "../../dataModels/destinationsList";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const [destinationsSet, updateDestinationsSet] = useState<Destination[]>([]);
    const [error, setErrorFlag] = useState({isError: false, msg: new Error()});
    const [mapParams, setMapParams] =  useState({
        lat: 0,
        lng: 0  
    });

    const destination = useSelector((state: Store) => { 
        const stateErr = state.callApiReducer.error;     
        if(stateErr){
           !error.isError && setErrorFlag({isError: true, msg: stateErr}); 
            return;
        }         
        const destination = state.callApiReducer.destination; 
        return destination 
    });  

    useEffect(() => { 
        if(destinationsSet?.length) return;
        async function getDestinationsList() {
            const response = await fetchDestinationsList();
            updateDestinationsSet(response); console.log("destArrres: ", response );
        }
        getDestinationsList();
        console.log("destArr outsideeeeeer: ", destinationsSet);
    }, [])
  
    myUseEffect(() => { 
        if(!destination) return;  
        console.log(destination.lat, destination.lng)     
          setMapParams({
            lat: destination.lat,
            lng: destination.lng
        })  
    }, [destination]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const pageContentOrErrorStatement = () => {
        if(!error.isError){
             return (  
                <MapWrapper className="mapWrapper">
                    <Panel 
                        destinations={destinationsSet} 
                    />
                    <WorldMap
                        theme={theme}
                        setMapParams={setMapParams}
                        mapParams={mapParams}
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