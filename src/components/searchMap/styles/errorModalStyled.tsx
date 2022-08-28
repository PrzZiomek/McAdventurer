import { PropsWithChildren } from "react";
import styled, { ThemedStyledProps } from "styled-components";
import { DivProps, DivWrapper } from "../../../ui/Div";

type propsType = ThemedStyledProps<PropsWithChildren<DivProps>, any>

export const ErrorModalStyled = styled(DivWrapper)` 
    position: absolute;
    z-index: 200;
    width: 300px;
    height: 170px;
    top: calc(50% - 85px);
    left: calc(50% - 150px);
    letter-spacing: 2px;
    background: white;
    color: #3E3E28;
    font-size: 0.5rem;
    text-align: center;
    border: 1px solid #3E3E28;
    text-align: center;

    h1{
        padding: 15px;
        padding-bottom: 10px;
    }
`;

