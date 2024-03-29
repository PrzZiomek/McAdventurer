import styled from "styled-components";
import { Div } from "../../../ui/Div";


export const MapThemesMenuStyled = styled(Div)`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    position: absolute; 
    top: 0;
    right: ${(props) => props.showUpBar === false ?  '-75px' : 0};
    height: 98.5%;
    width: 75px;
    margin-top: 1.2%;
    border-left: 1px solid #3e3e28;
    border-radius: 0 0 12px 0px;
    transition: 0.3s;
    z-index: 3;

    li {
        list-style: none;
        display: flex;
    }

    img{
        height: calc(99vh / 9);
        width: 100%;
        cursor: pointer;
    }

    img:hover{
        transform: scale(1.15);
    }
`; 
