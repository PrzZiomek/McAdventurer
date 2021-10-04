import { FC, useState } from "react";
import { isMapEvent } from "./types/mapEvents";
import { I } from "./types/interfaces";



export const withFunctionality =  (Component: FC<I.WorldMapWithData>) => 

    (props: I.WorldMap) =>{

        const [mapPlatform, setMapPlatform] = useState<H.service.Platform | null>(null);

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

        const layerWithTheme = (theme: string) => {
            if(!mapPlatform) return; 
            const tiles = mapPlatform.getMapTileService({'type': 'base'});
            const layer = tiles.createTileLayer(
                'maptile',
                theme,
                256, 
                'png',
            );
                return layer;
            }

            return  <Component 
                        setMapPlatform={setMapPlatform}
                        handleMapViewChange={handleMapViewChange} 
                        theme={props.theme}
                        layerWithTheme={layerWithTheme}
                    />  

    
}
