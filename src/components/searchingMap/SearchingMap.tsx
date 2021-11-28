import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../../data/destinations.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import {  withFunctionality } from "../worldMap/models/withFunctionality";
import { Panel } from "../panel/panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { store } from "../../state/store";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const [typed, setTypedValue] = useState<string>("");
    const [mapParams, setMapParams] =  useState({
        lat: 0,
        lng: 0  
    });

    useEffect(() => { 
        if(!typed) return; 
        console.log("!!!!!",store.getState().callApiReducer);         
       /* setMapParams({
           
        }) */
    }, [typed]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const WorldMapWithFunctionality = withFunctionality(WorldMap);
     
    return (  
        <MapWrapper className="mapWrapper">
            <Panel 
                 destinations={destinations.countries} 
                 setTypedValue={setTypedValue}
            />
            {WorldMapWithFunctionality({ 
              theme,
              typed,
              setMapParams,
              mapParams
            })}
            <MapThemesMenu onChangeTheme={onChangeTheme}/>
        </MapWrapper>
    )

}


