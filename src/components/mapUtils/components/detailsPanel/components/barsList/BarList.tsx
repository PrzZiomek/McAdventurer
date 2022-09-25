import React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSearchBox from "react-search-box";

import { Store } from "../../../../../../state/types";
import { Bar } from "./components/Bar";
import { Local } from "../../../../../../generalTypes/apiResponse";
import { FETCH_START } from "../../../../../../state/actions/actionTypes";



interface BarListProps {
   isMapClicked: boolean;
}


export const BarList: FC<BarListProps> = (props) => { 

   const [searchResults, setSearchResults] = useState<Local[] | undefined>([]);
   const [selectedPlace, setSelectedPlace] = useState<Local | undefined>();
   const dispatch = useDispatch();

   const nearbyBars: Local[] | undefined = useSelector((state: Store) => { 
      if(state.getNearbyBars.loading !== false) return; console.log(state.getNearbyBars.data); 
      return state.getNearbyBars.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   useEffect(() =>{
      setSearchResults(nearbyBars);
   }, [nearbyBars])

  const onSearchChange = async (query) => {
     if (query.length <= 2) return; 
     
     const action = {
         isMapClicked: props.isMapClicked,
         place: {
            query,
         }
      };
      dispatch({ type: FETCH_START.BARS, ...action });      
   }

   const setPlace = (key: string) =>{ 
      if(!searchResults) return;
      const selectedPlace = searchResults.find((p) => p.id === key);
      setSelectedPlace(selectedPlace);
    }

   const matchedResults = searchResults && 
      searchResults.map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `
         }))
      .sort((a, b) => a.dist - b.dist);

   const allResults = searchResults && 
      searchResults.map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: result.poi.name
      }))
      .sort((a, b) => a.dist - b.dist);
   
   const showBar = (): JSX.Element | null => selectedPlace ? <Bar data={selectedPlace} /> : null;

   return (
     <>
         <ReactSearchBox
            placeholder="Search for nearby bars"
            matchedRecords={matchedResults}
            data={allResults}
            onSelect={(place) =>  setPlace(place.item.key)}
            autoFocus={true}
            onChange={(query) => onSearchChange(query)}
            fuseConfigs={{
            minMatchCharLength: 0,
            threshold: 1,
            distance: 100000,
            sort: false
            }}
            keys = {['name']}
         />
         {showBar()}
     </>
   );

}