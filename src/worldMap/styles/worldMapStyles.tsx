import styled from "styled-components";
import { Div } from "../../ui/Div";


export const Map = styled(Div)`

    margin-left: -25px;
    height: 100vh;
    min-width: 70vw;
    flex-grow: 1;

    canvas{
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
    }
`