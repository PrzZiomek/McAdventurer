import { FC, PropsWithChildren } from "react"
import styled, { ThemedStyledProps } from "styled-components"

import { Div, DivProps } from "../../../ui/Div"
import { ToggleBar } from "../../../ui/ToggleBar"
import { ToggleBarProps } from "../../../ui/types"

type propsType = ThemedStyledProps<PropsWithChildren<DivProps> , any>

export const PanelToggleBarStyled = styled(Div)`
    position: absolute;
  //  right: ${(props: propsType) => props.switchToggleArrow === false ? -16 : -15}px;
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
    transform: rotate(${(props: propsType) => props.toggleState === false ? 45 : 225}deg); 

    &:hover {
    color: #C7C7A9;
}
`;
/*
export const PanelToggleBar: FC<ToggleBarProps> = (props: PropsWithChildren<ToggleBarProps>) =>{
    return ToggleBar(props)(PanelToggleBarStyled);
}  
*/
