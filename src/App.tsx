import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { SearchMap } from "./components/searchMap/SearchMap";
import { store } from "./state/store";
import  GlobalStyles  from "./styles/globalStyles";
import * as themes from "./styles/themes/schema.json";
import { LoaderInfo } from "./ui/utils/loader/LoaderInfo";
 

export const App = () => {

    return(  
        <>           
            <Provider store={store}>
                <ThemeProvider theme={themes.default.data.day}>
                    <GlobalStyles />  
                    <SearchMap/>   
                </ThemeProvider>     
            </Provider>                     
        </>
    ) 
}


