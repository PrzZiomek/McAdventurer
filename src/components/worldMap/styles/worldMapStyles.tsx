import styled from "styled-components";
import { Div, DivWrapper } from "../../../ui/Div";


export const MapStyled = styled(DivWrapper)`

    margin-left: -25px; 
    height: 100vh;
    flex-grow: 1;  
    background-color: #DFDFCE;

    > div {
        background-color: #DFDFCE;
    }

    canvas{
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        object-fit: cover;
    }
`