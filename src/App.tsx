import { Provider } from "react-redux";

import { SearchingMap } from "./components/searchingMap/SearchingMap";
import { store } from "./state/store";
import  GlobalStyles  from "./styles/globalStyles";
import { MainWrapper } from "./styles/mainWrapperStyles";


export const App = () => (
    <Provider store={store}>
        <GlobalStyles />
        <MainWrapper>
            <SearchingMap/>   
        </MainWrapper>    
     </Provider>   
) 


