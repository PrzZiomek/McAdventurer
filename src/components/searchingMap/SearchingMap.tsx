import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../../data/destinations.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import {  withFunctionality } from "../worldMap/models/withFunctionality";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { store } from "../../state/store";
import { useSelector } from "react-redux";
import { Store } from "../../state/types/store";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const [destinationsSet, updateDestinationsSet] = useState<string[]>(destinations.countries);
    const destination = useSelector((state: Store) => {
        const destination = state.callApiReducer.destination;
         return destination 
    });   
    const [mapParams, setMapParams] =  useState({
        lat: 0,
        lng: 0  
    });
 
    useEffect(() => { 
        if(!destination) return; 
        const destinations = [...destinationsSet, destination.name];
        updateDestinationsSet(Array.from(new Set(destinations)))    
        console.log("destination: ",destination);      console.log("destArr: ", destinations);   
         /* setMapParams({
           
        }) */ 
    }, [destination]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const WorldMapWithFunctionality = withFunctionality(WorldMap);
     
    return (  
        <MapWrapper className="mapWrapper">
            <Panel 
                destinations={destinationsSet} 
                updateDestinationsSet={updateDestinationsSet}
            />
            {WorldMapWithFunctionality({ 
              theme,
              setMapParams,
              mapParams
            })}
            <MapThemesMenu onChangeTheme={onChangeTheme}/>
        </MapWrapper>
    )

}


