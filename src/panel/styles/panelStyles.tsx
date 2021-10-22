import styled from "styled-components";
import { Div } from "../../ui/Div";


export const PanelWrapper = styled(Div)`
    width: ${(props) => props.bigScreenFit ? "20vw" : "30vw" };
    z-index: 2;
    color: #3e3e28;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #F7F7F3;
    position: relative;
    transition: 1s;
    box-shadow: 1px 1px 8px #3E3E28;
`;
