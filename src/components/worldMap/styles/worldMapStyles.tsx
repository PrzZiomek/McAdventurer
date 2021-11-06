import styled from "styled-components";
import { Div, DivWrapper } from "../../../ui/Div";


export const Map = styled(DivWrapper)`

    margin-left: -25px;
    height: 100vh;
    flex-grow: 1;

    canvas{
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        object-fit: cover;
    }
`