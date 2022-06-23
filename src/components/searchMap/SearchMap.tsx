import React, { Dispatch, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { SearchMapStyled } from "./styles/SearchMapStyles";
import { ActionErrObj, ErrorsCollection, Store } from "../../state/types";
import { startFetchDestListAction } from "../../state/actions/actions/fetchDestinationListActions";
import { ErrorModal } from "./components/errorModal/errorModal";
import { StoreProps } from "../../enums";
import { errorMonitAction } from "../../state/actions/actions/handleError";
import { errorCollector } from "../../helpers/errorCollector";
import { MapUtils } from "../mapUtils/MapUtils";
import { Destination } from "../../generalTypes/apiResponse";
import { WorldMap } from "../worldMap/WorldMap";



export const SearchMap: FC = () => {

    const storeItemsNames = [StoreProps.GetErrors, StoreProps.GetDestinationList, StoreProps.GetDestination];

    const dispatch: Dispatch<ActionErrObj> = useDispatch();

    useEffect(() => { 
        dispatch(startFetchDestListAction());
    }, [dispatch])

    const errors: ErrorsCollection = useSelector((store: Store) => { 
        return storeItemsNames.reduce(errorCollector(store), []) 
     });

    useEffect(() => { 
        dispatch(errorMonitAction(errors));
    }, [errors.length])
    
    const destinationList: Destination[] | undefined = useSelector((state: Store) => {  
        if(state.getDestinationList.loading !== false) return; 
        return state.getDestinationList.data;                                   
    });

    const errorInformation = (): JSX.Element | null => { 
        let Information: JSX.Element | null = null; 
        if(!errors) return null;

        const isError: boolean = errors.some(obj => obj.isError);   

        if(isError){      
            Information = <ErrorModal />        
        }; 

        return Information;
    }

    const destList: Destination[] = destinationList?.length ? destinationList : [];  
    
    return  ( 

            <SearchMapStyled id="mapWrapper">   

                {errorInformation()}  

                <MapUtils destinations={destList} /> 

                <WorldMap
                    destinations={destList}
                /> 

            </SearchMapStyled>  
     )
}
