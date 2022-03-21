import { Provider } from "react-redux";
import { GeoCurrentPosition } from "./components/geolocation/geoCurrentPosition";

import { SearchingMap } from "./components/searchingMap/SearchingMap";
import { store } from "./state/store";
import  GlobalStyles  from "./styles/globalStyles";

 
export const App = () => {
    
    return(
        <>
            <Provider store={store}>
                <GlobalStyles />  
                <SearchingMap/>   
            </Provider>         
        </>
    ) 
}


