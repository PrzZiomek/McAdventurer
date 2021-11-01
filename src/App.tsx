import React, { Component, FC, Fragment } from "react";
import styled from "styled-components";

import  mainImage  from "./Belfast.jpg";
import { SearchingMap } from "./searchingMap/SearchingMap";
import  GlobalStyles  from "./styles/globalStyles";


const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-image: url(${mainImage});
`;


export const App: React.FC = () => (
    <Fragment>
        <GlobalStyles />
        <MainWrapper>
            <SearchingMap/>   
        </MainWrapper>    
     </Fragment>   
) 


