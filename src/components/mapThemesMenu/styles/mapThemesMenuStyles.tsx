import styled from "styled-components";
import { Div } from "../../../ui/Div";


export const MapThemesMenuStyled = styled(Div)`
   position: absolute;
   top: 90px;
   right: 0;
   width: 75px;
   z-index: 3;
`; 

export const ThemesMenu = styled(Div)`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: 0.5s;
    margin-right: ${(props) => props.showUpBar === false ? "-44px" : 0};

    img{
        height: 75px;
        width: 100%;
    }

`;