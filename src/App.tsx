import { Provider } from "react-redux";

import { SearchingMap } from "./components/searchingMap/SearchingMap";
import { SearchingMapStyled } from "./components/searchingMap/styles/SearchingMapStyles";
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


