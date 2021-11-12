import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../../data/destinations.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import {  withFunctionality } from "../worldMap/models/withFunctionality";
import { Panel } from "../panel/panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
   // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [typed, setTypedValue] = useState<string>("");
    const [mapParams, setMapParams] =  useState({
        lat: 0,
        lng: 0  
    });

    useEffect(() => { 
        if(!typed) return; 
        const { lat, lng } = setCoordinates(typed);       
        setMapParams({
            lat,
            lng
        }) 
    }, [typed]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const setCoordinates = (typed: string) =>{
        if(typed === "miami"){
            return { 
               lat: 25.7616,
               lng: -80.1917 
            }
        }
        return { lat: 10, lng: 10 }
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


