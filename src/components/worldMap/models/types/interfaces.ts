import { Dispatch, SetStateAction } from "react";

export namespace I {

   export interface WorldMap{
        mapParams: H.geo.IPoint;
        setMapParams?: Dispatch<SetStateAction<{
        //  zoom: number,
          lat: number,
          lng: number  
      }>>;
        theme: string;
        typed?: string
      }

     export interface WorldMapWithData extends WorldMap{
          handleMapViewChange: (e: Event) => void;
          mapPlatform: () => H.service.Platform;
          layerWithTheme: (theme: string) => H.map.layer.TileLayer | undefined;
          moveMapTo: (map: H.Map | null) => void;
          setMarker: (map: H.Map | null) => void;
      }
}
