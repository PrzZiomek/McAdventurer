import React, { Dispatch, MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThemedStyledProps, ThemeProvider, useTheme } from "styled-components";

import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { SearchingMapStyles } from "./styles/SearchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { Store } from "../../state/types";
import { startFetchDestListAction } from "../../state/actions/fetchDestinationActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { myUseEffect } from "../../customHooks/myUseEffect";
import { storeErrorHandler } from "../../generalHandlers/storeErrorHandler";
import * as themes from "../../styles/themes/schema.json";
import { DestinationNameAndPos, WikiDestination } from "../../dataModels/types";
import { StoreProps } from "../../enums";
import { currentLocation, currentLocationAction, startLocationAction } from "../../state/actions/currentLocationAction";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void
// type useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

type numbOrStr = number | string;
type ErrorObject = { isError: boolean, content: Error };
type ErrorName = "getDestinationList" | "getDestination" | "worldMapAPI"
type PartialRecord<K extends string, T> = { [P in K]?: T };

type ErrorsCollection = { isError: true; content: Error; }[] & { isError: false; }[];


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState<string>("normal.day");
    const [styleTheme, setStyleTheme] = useState<JSON>(themes.default.data.day);
    const dispatch: Dispatch<({ type: string })> = useDispatch();
    const [mapParams, setMapParams] =  useState<{ lat: numbOrStr, lng: numbOrStr }>({
        lat: 0,
        lng: 0  
    });  

    myUseEffect(() => { 
        dispatch(startFetchDestListAction());
        dispatch(startLocationAction()) 
    }, [dispatch])

    const errors: ErrorsCollection = useSelector(storeErrorHandler([
        StoreProps.GetErrors,
        StoreProps.GetDestinationList,
        StoreProps.GetDestination
    ]));
      
    const destinationList: DestinationNameAndPos[] | undefined = useSelector((state: Store) => { 
        if(state.getDestinationList.loading !== false) return;
        return state.getDestinationList.destinations;                                   
    });

    const currentLocation = useSelector((state: Store) => { 
        return state.getCoordinates;
    });

    const destination: WikiDestination | undefined = useSelector((state: Store) => { 
        if(state.getDestination.loading !== false) return;
        return state.getDestination.destination;                                                         //  destination?.name === state.getDestination.destination.name                                                                                //setDestination(state.getDestination.destination)  
    })

    useEffect(() => {
        setMapParams(currentLocation)
    }, [currentLocation])
  
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
            lat = latNumb;
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
        if(!errors) return null;
        const checkedErrors = errors.map(err => err ? err : { isError: false });
        const isError: boolean = checkedErrors.some(obj => obj.isError);   

        if(isError){      
            Information = <ErrorModal />        
            console.log("list of errors: ", errors);
        }; 

        return Information;
    }

    const destList: DestinationNameAndPos[] = destinationList?.length ? destinationList : []; 
    const mapParamsAsNumbers = { lat: +mapParams.lat, lng: +mapParams.lng };

    return  ( 
        <ThemeProvider theme={styleTheme}>
            <SearchingMapStyles id="mapWrapper">   

                {errorInformation()}  

                <Panel 
                    destinations={destList} 
                />
                <WorldMap
                    theme={theme}
                    setMapParams={setMapParams}
                    mapParams={mapParamsAsNumbers}
                />

                <MapThemesMenu onChangeTheme={onChangeTheme}/>
            </SearchingMapStyles>
        </ThemeProvider>
     )
}


function isNotNumber(val: number | string): boolean{
    return (!val || isNaN(val as any));
} 