import styled from "styled-components";

 
export const Loader = styled.div`

    position: relative;
    height: 40px;
    width: 40px;
    border: 6px solid #6F6F49;
    top: calc(30% + 30px);
    border-radius: 50%;
    border-top: #DFDFCE;
    animation: spin 1.3s infinite linear;

    &::after{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 55px;
        background-color: #DFDFCE;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    @media (min-width: 768px){

    .loader:empty {
        height: 70px;
        width: 70px;
        top: calc(30% + 40px);
        left: calc(50% - 35px);
        border: 8px solid #6F6F49;
    }

    .loader:empty::after{
        top: 0;
        height: 55px;
    }
}

`


