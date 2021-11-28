import { Provider } from "react-redux";
import styled from "styled-components";

import  mainImage  from "./Belfast.jpg";
import { SearchingMap } from "./components/searchingMap/SearchingMap";
import { store } from "./state/store";
import  GlobalStyles  from "./styles/globalStyles";


const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-image: url(${mainImage});
`;


export const App = () => (
    <Provider store={store}>
        <GlobalStyles />
        <MainWrapper>
            <SearchingMap/>   
        </MainWrapper>    
     </Provider>   
) 


