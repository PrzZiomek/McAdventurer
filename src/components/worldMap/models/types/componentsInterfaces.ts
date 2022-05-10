import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { DestinationNameAndPos } from "../../../../generalTypes/apiResponse";

export namespace I {

   export interface WorldMap {
        destinations: DestinationNameAndPos[] | undefined;
        mapParams?: H.geo.IPoint;
        coords?: {
          lat: number;
          lng: number;
      },
        setCoords?: Dispatch<SetStateAction<{
          lat: number;
          lng: number;
      }>>;
        typed?: string,
        userLocationCoords?: {
          lat: number;
          lng: number;
        }
      }

    export interface Panel{
        destinations: DestinationNameAndPos[] | undefined;
        setShowPanel: Dispatch<SetStateAction<boolean>>
        showPanel: boolean;
    }

    export interface MapUtils {
      destinations: DestinationNameAndPos[] | undefined;
   }

    export interface DestinationBrowser{
      destinations: DestinationNameAndPos[] | undefined;
      setShowPanel?: Dispatch<SetStateAction<boolean>>
    }

    export interface DestinationsHints {
      setInputTypedValue: Dispatch<SetStateAction<string>>;
      setFiltered: Dispatch<SetStateAction<DestinationNameAndPos[]>>; 
      filtered: DestinationNameAndPos[];
    }
  
    export interface MapThemesMenu{
      onChangeTheme: MouseEventHandler<HTMLImageElement>;
    }

    export interface DetailsPanel{
      render: (data: any) => JSX.Element,
      showPanel?: boolean;
    }
}
