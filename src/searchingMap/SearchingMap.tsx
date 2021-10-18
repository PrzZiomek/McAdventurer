import React, { MouseEvent, MouseEventHandler, useEffect, useState } from "react"

import destinations from "../data/destinations.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import {  WorldMapWithFunctionality } from "../worldMap/models/withFunctionality";
import { Panel } from "../panel/panel";
import { MapWrapper } from "./styles/searchingMapStyles";


//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [mapParams, setMapParams] =  useState({
        zoom: 0,
        lat: 0,
        lng: 0  
    });
    const [theme, setTheme] = useState("normal.day");

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }
       
    return(  
        <MapWrapper className="mapWrapper">
            <Panel destinations={destinations.countries} />
            <WorldMapWithFunctionality
               theme={theme}
               setMapParams={setMapParams}
             />
           {
           // <MapThemesMenu onChangeTheme={onChangeTheme}/>
           } 
        </MapWrapper>
    )

}