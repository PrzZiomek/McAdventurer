import React, { Dispatch, MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { Store, StoreProps } from "../../state/types";
import { DestinationNameAndPos, WikiDestination } from "../../dataModels/types";
import { startFetchDestListAction } from "../../state/actions/fetchDestinationActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { myUseEffect } from "../../customHooks/myUseEffect";
import { storeErrorHandler } from "../../generalHandlers/storeErrorHandler";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void
// type useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

type numbOrStr = number | string;
type ErrorObject = { isError: boolean, content: Error };
type ErrorName = "getDestinationList" | "getDestination" | "worldMapAPI"
type PartialRecord<K extends string, T> = { [P in K]?: T };

type ErrorCollection = PartialRecord<ErrorName, ErrorObject>


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const dispatch: Dispatch<({ type: string })> = useDispatch();
    const [mapParams, setMapParams] =  useState<{ lat: numbOrStr, lng: numbOrStr }>({
        lat: 0,
        lng: 0  
    });
    
    const worldMapAPIError = useSelector(storeErrorHandler(StoreProps.GetErrors));

    const destinationListError = useSelector(storeErrorHandler(StoreProps.GetDestinationList));
  
    const destinationList = useSelector((state: Store) => { 
        if(state.getDestinationList.loading !== false) return;
        return state.getDestinationList.destinations;                                   
    }) 

    const destinationError = useSelector(storeErrorHandler(StoreProps.GetDestination));

    const destination = useSelector((state: Store) => { 
        if(state.getDestination.loading !== false) return;
        return state.getDestination.destination;                                                         //  destination?.name === state.getDestination.destination.name                                                                                //setDestination(state.getDestination.destination)  
    })
 
    myUseEffect(() => { 
        dispatch(startFetchDestListAction()) 
    }, [dispatch])
  
    useEffect(() => { 
        if(!destination) return;         
        const { coordinates } = destination;
        let lat: numbOrStr = coordinates?.lat;
        let lng: numbOrStr = coordinates?.lng;  

        if((isNotNumber(coordinates.lat) || isNotNumber(coordinates.lng)) && destinationList){                                                                                                                                                                                                                                                                                                                                                           
            const dest = destinationList.find(dest => dest.name === destination.name);
            if(!dest) return;
            const latNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;        
            const lngNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;      
            lat =  latNumb;
            lng = lngNumb; 
        }

        setMapParams({
            lat,
            lng,
        });     
        
    }, [destination?.name]);  

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const errorInformation = (): JSX.Element | null => {
        let Information: JSX.Element | null = null; 
        const mapError = worldMapAPIError ? worldMapAPIError : { isError: false };
        const destListError = destinationListError ? destinationListError : { isError: false };
        const destError = destinationError ? destinationError : { isError: false };
        const isError: boolean = [mapError, destListError, destError].some(obj => obj.isError);   
        if(isError){      
            Information = <ErrorModal />        
            console.log("list of errors: ", {mapError, destListError, destError});
        }; 
        return Information;
    }

    const destList = destinationList?.length ? destinationList : []; 
    
    const mapParamsAsNumbers = { lat: +mapParams.lat, lng: +mapParams.lng };

    return  (
        <>
          {errorInformation()}

          <MapWrapper className="mapWrapper">
                <Panel 
                    destinations={destList} 
                />
                <WorldMap
                    theme={theme}
                    setMapParams={setMapParams}
                    mapParams={mapParamsAsNumbers}
                />
                <MapThemesMenu onChangeTheme={onChangeTheme}/>
          </MapWrapper>
       </>
     )
}


function isNotNumber(val: number | string): boolean{
    return (!val || isNaN(val as any));
} 