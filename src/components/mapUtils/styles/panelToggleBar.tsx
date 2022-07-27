import { FC, PropsWithChildren } from "react"
import styled, { ThemedStyledProps } from "styled-components"

import { Div, DivProps } from "../../../ui/Div"


type propsType = ThemedStyledProps<PropsWithChildren<DivProps> , any>

export const PanelToggleBarStyled = styled(Div)`
    position: absolute;
    left: calc(50% - 27px/2);
    bottom: 96%;
    color: #3e3e28;
    cursor: pointer;
    font-size: 14px;
    width: 31px;
    height: 31px;
    background: linear-gradient(to bottom right,transparent 0%,transparent 50%,#F7F7F3 50%,#F7F7F3 100%);
    border-right: 3px solid #6F6F49;
    border-bottom: 3px solid #6F6F49; 
    transform: rotate(${(props: propsType) =>{console.log("toggleState", props.toggleState); return props.toggleState === true ? 45 : 225} }deg);

    &:hover {
     border-color : #abab93;
     background: linear-gradient(to bottom right,transparent 0%,transparent 50%,#C7C7A9 50%,#C7C7A9 100%);
    }
`;

