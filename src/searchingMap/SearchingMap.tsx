import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../data/destinations.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import {  withFunctionality } from "../worldMap/models/withFunctionality";
import { Panel } from "../panel/panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
   // const [size, setSize] = useState<DOMRect | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [mapParams, setMapParams] =  useState({
        zoom: 0,
        lat: 0,
        lng: 0  
    });

    useEffect(() => {
         function handleResize(){
             setWindowWidth(window.innerWidth)
         }
         window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize)
    }) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }
    
    const WorldMapWithFunctionality = withFunctionality(WorldMap);
     
    return (  
        <MapWrapper className="mapWrapper">
            <Panel destinations={destinations.countries} />
            {WorldMapWithFunctionality({ 
              theme,
              setMapParams
            })}
            <MapThemesMenu onChangeTheme={onChangeTheme}/>
        </MapWrapper>
    )

}


