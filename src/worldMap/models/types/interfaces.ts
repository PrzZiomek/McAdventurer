import { Dispatch, SetStateAction } from "react";

export namespace I {

   export interface WorldMap{
        mapParams?:{
          zoom: number,
          lat: number,
          lng: number  
      };
        setMapParams?: Dispatch<SetStateAction<{
          zoom: number,
          lat: number,
          lng: number  
      }>>;
        theme: string;
      }

     export interface WorldMapWithData extends WorldMap{
        handleMapViewChange: (e: Event) => void;
        setMapPlatform: Dispatch<React.SetStateAction<H.service.Platform | null>>;
        layerWithTheme: (theme: string) => H.map.layer.TileLayer | undefined;
      }
}
