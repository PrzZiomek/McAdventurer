import styled from "styled-components";
import { Div } from "../../../ui/Div";

export const PanelWrapper = styled(Div)`
    width: 400px;
    height: 100%;
    z-index: 2;
    margin-left: ${(props) => props.showUpBar === false ? "-400px" : 0};
    color: #3e3e28;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #F7F7F3;
    position: relative;
    transition: 0.5s;
    box-shadow: 3px 0px 15px #3E3E28;
`;
