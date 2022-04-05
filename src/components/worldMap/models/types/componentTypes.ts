import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { DestinationNameAndPos } from "../../../../generalTypes/apiResponse";
import { Coordinates } from "../../../../generalTypes/others";

export namespace I {

   export interface WorldMap{
        mapParams?: H.geo.IPoint;
        coords: {
          lat: number;
          lng: number;
      },
        setCoords?: Dispatch<SetStateAction<Coordinates>>;
        typed?: string,
        userLocationCoords: {
          lat: number;
          lng: number;
        }
      }

    export interface Panel{
        destinations: DestinationNameAndPos[] | undefined;
    }

    export interface DestinationBrowser{
      destinations: DestinationNameAndPos[] | undefined;
    }
  
    export interface MapThemesMenu{
      onChangeTheme: MouseEventHandler<HTMLImageElement>;
    }
}
