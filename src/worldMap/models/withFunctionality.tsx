import { FC, useState } from "react";
import { isMapEvent } from "./types/mapEvents";
import { I } from "./types/interfaces";
import { MapStyles, WorldMap } from "../WorldMap";
import { log } from "console";
import { Layers } from "@material-ui/icons";


 export const WorldMapWithFunctionality: FC<I.WorldMap> =  (props) => {

    const handleMapViewChange = (e: Event) => {    
        if(!isMapEvent(e, "mapviewchange")) return;         
        if (!(e.newValue && e.newValue.lookAt)) return; 
        const lookAt = e.newValue.lookAt;
        const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
        const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
        const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
        if(!props.setMapParams) return;
            props.setMapParams({
                lat,
                lng,
                zoom
            })               
    }

    const mapPlatform = () => {
        const platform = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
        return platform;
    }

    const layerWithTheme = (theme: string) => { 
        const platform = mapPlatform();
        if(!mapPlatform) return; 
        const tiles = platform.getMapTileService({'type': 'base'});
        const layer = tiles.createTileLayer(
            'maptile',
            theme,
            256, 
            'png',
            ); 
        return layer;
    }

    return  <WorldMap
                handleMapViewChange={handleMapViewChange} 
                theme={props.theme}
                layerWithTheme={layerWithTheme}
                mapPlatform={mapPlatform}
            />  
}

    


