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
import { LoaderInfo } from "../../ui/utils/LoaderInfo";

const WorldMapMemo = React.lazy(() => import("../worldMap/WorldMap"));


export const SearchMap: FC = () => {

    const storeItemsNames = [StoreProps.GetErrors, StoreProps.GetDestinationList, StoreProps.GetDestination];
    const [destList, setDestList] = useState<Destination[]>([]);

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

    const loaderElement: JSX.Element = <LoaderInfo>Loading data</LoaderInfo>;

    return  ( 
        <>
            <header>
                <MainHeader>Online interactive world map</MainHeader>
            </header>
            <main>
                <SearchMapStyled id="wrapper">   
                    {errorInformation()}  
                    <MapUtils>
                        <UtilsTopSectionMemo destinations={destList}/> 
                        <DetailsPanel />    
                    </MapUtils>
                    <ErrorBoundary 
                        FallbackComponent={ErrorFallback}
                        onReset={()=> {}} 
                    > 
                    <Suspense fallback={loaderElement}>
                        <WorldMapMemo destinations={destList}/>
                    </Suspense>
                    </ErrorBoundary>
                </SearchMapStyled>
            </main>
        </>
     )
}
