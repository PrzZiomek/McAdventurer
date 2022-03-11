import styled from "styled-components";
import { Div } from "../../../ui/Div";


export const MapThemesMenuStyles = styled(Div)`
   position: absolute;
   bottom:0;
   right: 0;
   width: 800px;
` 

export const ThemesMenu = styled(Div)`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    transition: 0.5s;
    margin-bottom: ${(props) => props.showUpBar === false ? "-44px" : 0};

    img{
        width: 11%;
        cursor: pointer;
    }
`