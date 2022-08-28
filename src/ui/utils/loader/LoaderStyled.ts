import styled from "styled-components";
import { Div } from "../../Div";

 
export const LoaderStyled = styled(Div)`

    position: absolute;
    height: 40px;
    width: 40px;
    border: 6px solid #6F6F49;
    top: calc(50% - 120px);
    left: calc(50% - 20px);
    border-radius: 50%;
    border-top: #DFDFCE;
    animation: spin 0.8s infinite linear;

    &::after{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20px;
        background-color: #DFDFCE;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    @media (min-width: 768px){

        height: 50px;
        width: 50px;
        top: calc(50% - 35px);
        left: calc(50% - 25px);
        border: 8px solid #6F6F49;

        &::after{
            top: 10px;
            height: 34px;
        }
    }

`


