import React, { FC, Fragment } from "react";
import styled from "styled-components";

import  mainImage  from "./Belfast.jpg";
import { WorldMap } from "./WorldMap";
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
            <WorldMap/>   
        </MainWrapper>    
     </Fragment>   
) 

