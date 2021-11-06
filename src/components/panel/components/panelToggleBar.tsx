import { FC } from "react"
import styled from "styled-components"

import { Div } from "../../../ui/Div"
import { ToggleBar } from "../../../ui/ToggleBar"


const PanelToggleBarStyled = styled(Div)`
    position: absolute;
    right: -14px;
    top: 50%;
    color: #3e3e28;
    cursor: pointer;
    font-size: 14px;
    width: 30px;
    height: 30px;
    background: linear-gradient(to bottom right,transparent 0%,transparent 50%,#F7F7F3 50%,#F7F7F3 100%);
    border-right: 2px solid #3e3e28;
    border-bottom: 2px solid #3e3e28; 
    transform: rotate(${(props) => props.switchToggleArrow === false ? 315 : 135}deg) ; 
`

export const PanelToggleBar: FC<ToggleBar> = (props) => ToggleBar(props)(PanelToggleBarStyled);

