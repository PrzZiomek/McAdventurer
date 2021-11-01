import { FC, useState } from "react";
import { isMapEvent } from "./types/mapEvents";
import { I } from "./types/interfaces";
import { WorldMap } from "../WorldMap";
import { createDomMarker } from "../helpers/createDomMarker";


 export const withFunctionality =  (Component: FC<I.WorldMapWithData>) => {
 
   return (props: I.WorldMap) => {

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

        const  moveMapTo = (map: H.Map | null) =>{
            if(!map) return; 
            map.setCenter({lat:52.5159, lng:13.3777});
            map.setZoom(10); console.log("ha ah");   
        }

        const setMarker = (map: H.Map | null) =>{
            if(!map) return; 
            const domIcon = createDomMarker();
            var bearsMarker = new H.map.DomMarker({lat:52.5159, lng:13.3777}, {
            icon: domIcon
            });
            map.addObject(bearsMarker); 
        }

        return  <Component
                    handleMapViewChange={handleMapViewChange} 
                    theme={props.theme}
                    layerWithTheme={layerWithTheme}
                    mapPlatform={mapPlatform}
                    moveMapTo={moveMapTo}
                    setMarker={setMarker}
                />  
    }

}
    

