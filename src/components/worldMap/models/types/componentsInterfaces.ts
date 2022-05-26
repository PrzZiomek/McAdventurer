import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Destination } from "../../../../generalTypes/apiResponse";

export namespace I {

   export interface WorldMap {
        destinations: Destination[] | undefined;
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
        destinations: Destination[] | undefined;
        setShowPanel: Dispatch<SetStateAction<boolean>>
        showPanel: boolean;
    }

    export interface MapUtils {
      destinations: Destination[] | undefined;
   }

    export interface DestinationBrowser{
      destinations: Destination[] | undefined;
      setShowPanel?: Dispatch<SetStateAction<boolean>>
    }

    export interface DestinationsHints {
      setInputTypedValue: Dispatch<SetStateAction<string>>;
      setFiltered: Dispatch<SetStateAction<Destination[]>>; 
      filtered: Destination[];
    }
  
    export interface DetailsPanel{
      render: (data: any) => JSX.Element,
      showPanel?: boolean;
    }
}
