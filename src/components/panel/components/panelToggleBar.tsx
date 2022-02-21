import { FC, PropsWithChildren } from "react"
import styled, { ThemedStyledProps } from "styled-components"

import { Div, DivProps } from "../../../ui/Div"
import { ToggleBar } from "../../../ui/ToggleBar"
import { ToggleBarProps } from "../../../ui/types"

type propsType = ThemedStyledProps<PropsWithChildren<DivProps> , any>

const PanelToggleBarStyled = styled(Div)`
    position: absolute;
    right: ${(props: propsType) => props.switchToggleArrow === false ? -18 : -15}px;
    top: 50%;
    color: #3e3e28;
    cursor: pointer;
    font-size: 14px;
    width: 30px;
    height: 30px;
    background: linear-gradient(to bottom right,transparent 0%,transparent 50%,#F7F7F3 50%,#F7F7F3 100%);
    border-right: 3px solid #3e3e28;
    border-bottom: 3px solid #3e3e28; 
    transform: rotate(${(props: propsType) => props.switchToggleArrow === false ? 315 : 135}deg) ; 
`

export const PanelToggleBar: FC<ToggleBarProps> = (props: PropsWithChildren<ToggleBarProps>) =>{
    return ToggleBar(props)(PanelToggleBarStyled);
}  

