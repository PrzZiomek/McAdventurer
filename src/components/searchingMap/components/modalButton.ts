import { FC } from "react";
import styled from "styled-components";
import {  Div, DivWrapper } from "../../../ui/Div";
import { ToggleBar } from "../../../ui/ToggleBar";
import { ToggleBarProps, ToggleBarWithChildren } from "../../../ui/types";


export const ModalButton = styled(Div)`
    display: inline-block;
    cursor: pointer;
    color: #6F6F49;
    position: relative;
    top: 10px;
    font-weight: bold;
    padding: 8px 25px;
    font-size: 0.9rem;
    text-transform: uppercase;
    border: 1px solid #3E3E28;

    &:hover{
        background-color: #DFDFCE;
    }
`;


export const ToggleButton: FC<ToggleBarProps>  = (props: ToggleBarWithChildren) => ToggleBar(props)(ModalButton);
