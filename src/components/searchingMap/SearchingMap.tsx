import React, { MouseEvent, useEffect, useState } from "react"

import destinations from "../../data/destinations.json";
import destinationsList1  from "../../data/cities.json";
import destinationsList2  from "../../data/cities2.json";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { Panel } from "../panel/Panel";
import { MapWrapper } from "./styles/searchingMapStyles";
import { WorldMap } from "../worldMap/WorldMap";
import { store } from "../../state/store";
import { useSelector } from "react-redux";
import { Store } from "../../state/types/store";
import { ErrorPanel } from "./styles/errorPanel";
import { getDestinationsList } from "../../api/getDestinationsList";

//type MouseEventHandler<T = Element> = (event: MouseEvent<T, globalThis.MouseEvent>) => void


export const SearchingMap: React.FC = () => {

    const [theme, setTheme] = useState("normal.day");
    const [destinationsSet, updateDestinationsSet] = useState<string[]>(destinations.countries);
    const [error, setErrorFlag] = useState({isError: false, msg: new Error()});
    const [mapParams, setMapParams] =  useState({
        lat: 0,
        lng: 0  
    });

    const destination = useSelector((state: Store) => { 
        const stateErr = state.callApiReducer.error;     
        if(stateErr){
           !error.isError && setErrorFlag({isError: true, msg: stateErr}); 
            return;
        }         
        const destination = state.callApiReducer.destination; 
        return destination 
    });  
    
    useEffect(() => { 
       let citiesWithTheirCountries = [];
       let citiesWithGeo = []; 
       const destinationsList1Length = destinationsList1.length;
       const destinationsList2Length = destinationsList2.length; 

       const arrayObj = [{name:"henry", id: 2}, {name:"henry", id: 3}, {name:"henry", id: 5}, {name:"maret", id: 2}, {name:"jarek", id: 2}, {name:"henry", id: 4},  {name:"al", id: 2}];
       const arryObjSorted = arrayObj.sort(function(a, b){
        const nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) 
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; 
       });  
     /*  const resarr = arryObjSorted.reduce((acc, poz, i) => {
            if(poz)
       }, [])
    */
       for(let i=0; i <= destinationsList1.length; i++){ 
         let name = destinationsList1[i]?.name ? destinationsList1[i]?.name : "unset";
         let country = destinationsList1[i]?.country ? destinationsList1[i]?.country : "unset";
         citiesWithTheirCountries[i] = { 
            city: name,
            country
         }
       } 
      // console.log(citiesWithTheirCountries);
        
       for(let i=0; i <= destinationsList2Length - 1 ; i++){  
        let city = destinationsList2[i]?.city ? destinationsList2[i]?.city : "unset";
        let country = destinationsList2[i]?.country ? destinationsList2[i]?.country : "unset";
        let lat = destinationsList2[i]?.lat ? destinationsList2[i]?.lat : "unset";
        let lng = destinationsList2[i]?.lng ? destinationsList2[i]?.lng : "unset";
        citiesWithGeo[i] = { 
           city,
           country,
           lat,
           lng
        }
      } 
     // console.log(citiesWithGeo);
    const allDestinations = [...citiesWithTheirCountries, ...citiesWithGeo];
      const arrayObjdone = [...new Map(allDestinations.map(v => [v.city, v])).values()];
      console.log(arrayObjdone);    
      //  getDestinationsList()
    },[])
    
    useEffect(() => { 
        if(!destination) return; 
        const destinations = [...destinationsSet, destination.name];
        updateDestinationsSet(Array.from(new Set(destinations)))    
        console.log("destination: ",destination);      console.log("destArr: ", destinations);   
          setMapParams({
            lat: destination.lat,
            lng: destination.lng
        })  
    }, [destination]) 

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        setTheme(themeElement.id)
    }

    const pageContentOrErrorStatement = () => {
        if(!error.isError){
             return (  
                <MapWrapper className="mapWrapper">
                    <Panel 
                        destinations={destinationsSet} 
                        updateDestinationsSet={updateDestinationsSet}
                    />
                    <WorldMap
                        theme={theme}
                        setMapParams={setMapParams}
                        mapParams={mapParams}
                    />
                    <MapThemesMenu onChangeTheme={onChangeTheme}/>
                </MapWrapper>
             )
        }else{ 
            console.log("error message: ", error.msg);
            return (
                <ErrorPanel>
                    <h1>Błąd serwera!</h1>
                </ErrorPanel>
            )
        }
    }
     
    return  (
        <>
          {pageContentOrErrorStatement()}
       </>
     )
}


