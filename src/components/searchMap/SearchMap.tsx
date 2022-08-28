import React, { Dispatch, FC, Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import { SearchMapStyled } from "./styles/SearchMapStyles";
import { ActionErrObj, ErrorsCollection, Store } from "../../state/types";
import { startFetchDestListAction } from "../../state/actions/actions/fetchDestinationListActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { StoreProps } from "../../enums";
import { errorMonitAction } from "../../state/actions/actions/handleError";
import { errorCollector } from "../../helpers/errorCollector";
import { MapUtils } from "../mapUtils/MapUtils";
import { Destination } from "../../generalTypes/apiResponse";
import { MainHeader } from "../../styles/MainHeader";
import { UtilsTopSectionMemo } from "../mapUtils/components/utilsTopSection/UtilsTopSection";
import { DetailsPanel } from "../mapUtils/components/detailsPanel/DetailsPanel";
import { ErrorFallback } from "../../ui/utils/errorNotyfications/ErrorFallback";
import { WorldMapMemo } from "../worldMap/WorldMap";
import { LoaderInfo } from "../../ui/utils/loader/LoaderInfo";


export const SearchMap: FC = () => {

    const storeItemsNames = [StoreProps.GetErrors, StoreProps.GetDestinationList, StoreProps.GetDestination];
    const [destList, setDestList] = useState<Destination[]>([]);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const dispatch: Dispatch<ActionErrObj> = useDispatch();

    useEffect(() => { 
        dispatch(startFetchDestListAction());
    }, [dispatch])


    const errors: ErrorsCollection = useSelector((store: Store) => {  
        return storeItemsNames.reduce(errorCollector(store), []);
     });

    useEffect(() => { 
        dispatch(errorMonitAction(errors));
    }, [errors.length])
    
    const destinationList: Destination[] | undefined = useSelector((state: Store) => {  
        if(state.getDestinationList.loading !== false) return; 
        return state.getDestinationList.data;       
    });

    useEffect(() => {
        if(!destinationList?.length) return;
        setDestList(destinationList)
    },[destinationList?.length])


    const errorInformation = (): JSX.Element | null => { 
        let Information: JSX.Element | null = null; 
        if(!errors) return null;

        const isError: boolean = errors?.some(obj => obj.isError);   

        if(isError){      
            Information = <ErrorModal />        
        }; 

        return Information;
    }; 

    const loadMapUtilsWhenMapReady = () => !isMapLoaded ? <LoaderInfo>Building map...</LoaderInfo> : 
        <MapUtils>
            <UtilsTopSectionMemo destinations={destList}/> 
            <DetailsPanel />    
        </MapUtils>

    return  ( 
        <>
            <header>
                <MainHeader>Online interactive world map</MainHeader>
            </header> 
            <main>
                <SearchMapStyled id="wrapper">   
                    {errorInformation()}  
                    {loadMapUtilsWhenMapReady()}
                    <ErrorBoundary 
                        FallbackComponent={ErrorFallback}
                        onReset={()=> {}} 
                    > 
                        <WorldMapMemo 
                            destinations={destList}
                            setIsMapLoaded={setIsMapLoaded}
                        />
                    </ErrorBoundary>
                </SearchMapStyled>  
            </main>
        </> 
     )
}
