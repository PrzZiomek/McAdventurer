import React, { Dispatch, MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThemedStyledProps, ThemeProvider, useTheme } from "styled-components";

import { Panel } from "../panel/Panel";
import { SearchingMapStyles } from "./styles/SearchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { ActionErrObj, ErrorsCollection, Store } from "../../state/types";
import { startFetchDestListAction } from "../../state/actions/fetchDestinationActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { myUseEffect } from "../../customHooks/myUseEffect";
import { storeErrorHandler } from "../../generalHandlers/storeErrorHandler";
import * as themes from "../../styles/themes/schema.json";
import { DestinationNameAndPos, WikiDestination } from "../../generalTypes/apiResponse";
import { StoreProps } from "../../enums";
import { startLocationAction } from "../../state/actions/currentLocationAction";
import { errorMonitAction } from "../../state/actions/errorActions";
import { determineCoords } from "./helpers/determineCoords";
import { Coordinates, NumbOrStr } from "../../generalTypes/others";
import { MapUtils } from "../mapUtils";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void
// type useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

export const SearchingMap: React.FC = () => {

    const storeItemsNames = [StoreProps.GetErrors, StoreProps.GetDestinationList, StoreProps.GetDestination];

    const [styleTheme, setStyleTheme] = useState<JSON>(themes.default.data.day);
    const [coords, setCoords] =  useState<Coordinates>({ lat: 0, lng: 0 });
    const [userLocationCoords, setUserLocationCoords] = useState<Coordinates>({ lat: 0, lng: 0 }); 
    const dispatch: Dispatch<ActionErrObj> = useDispatch();

    useEffect(() => { 
        dispatch(startFetchDestListAction());
        dispatch(startLocationAction()) 
    }, [dispatch])

    const errors: ErrorsCollection = useSelector(storeErrorHandler(storeItemsNames));

    useEffect(() => { 
        dispatch(errorMonitAction(errors));
    }, [errors.length])

    const currentLocation = useSelector((state: Store) => { 
        return state.getCoordinates;
    });
    
    useEffect(() => {
        setUserLocationCoords(currentLocation);  
    }, [currentLocation])
  
    const destinationList: DestinationNameAndPos[] | undefined = useSelector((state: Store) => { 
        if(state.getDestinationList.loading !== false) return;
        return state.getDestinationList.destinations;                                   
    });

    const destination: WikiDestination | undefined = useSelector((state: Store) => { 
        if(state.getDestination.loading !== false) return;
        return state.getDestination.destination;                                                         //  destination?.name === state.getDestination.destination.name                                                                                //setDestination(state.getDestination.destination)  
    })

    useEffect(() => { 
        if(!destination || !destinationList) return;         
        
        const { lat, lng } = determineCoords(destination, destinationList)
       
        setCoords({
            lat,
            lng,
        });     
        
    }, [destination?.name]);  

    const errorInformation = (): JSX.Element | null => {
        let Information: JSX.Element | null = null; 
        if(!errors) return null;

        const isError: boolean = errors.some(obj => obj.isError);   

        if(isError){      
            Information = <ErrorModal />        
        }; 

        return Information;
    }

    const destList: DestinationNameAndPos[] = destinationList?.length ? destinationList : []; 
    const coordsAsNumbers = { lat: +coords.lat, lng: +coords.lng };
    const userCoordsAsNumbers = { lat: +userLocationCoords.lat, lng: +userLocationCoords.lng };
 
    return  ( 
        <ThemeProvider theme={styleTheme}>
            <SearchingMapStyles id="mapWrapper">   
                {errorInformation()}  
                <MapUtils destinations={destList} /> 
                <WorldMap
                    setCoords={setCoords}
                    coords={coordsAsNumbers}
                    userLocationCoords={userCoordsAsNumbers}
                />                            
            </SearchingMapStyles>  
        </ThemeProvider>
     )
}
