import styled from "styled-components";
import { Section } from "../../../../../../../../../ui/Section";

export const SettingsMenuStyled = styled(Section)`
   position: absolute; 
   top: -25px;
   right: ${(props) => props.showPanel === false ? "-385px" : "-52px" } ;
   width: 275px;
   height: 100vh;
   z-index: 3;
   background-color: white; 
   border-radius: 0 0 7px 7px;
   box-shadow: inset 0 0 8px #000 ;
   transition: 0.5s; 
   border: none;

   .menuList {
      margin: 10px;
      color: #6F6F49;
      padding: 10px;
      text-align: center;
   }

   li {
      list-style: none; 
   }

   button{
      background: transparent;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      width: 100%;
      height: 100%;
      padding: 10px;
      border-bottom: 1px solid #6F6F49;
      letter-spacing: 1px;
      transition: 0.2s;
      border-radius: 0;
      text-transform: capitalize;
   }

  button:hover {
    color: #3E3E28;
    background-color: #DFDFCE;
    border: 2px solid #6F6F49;
    border-top: none;
    border-radius: 0 0 5px 5px;
   }

   @media (min-width: 768px){
      right: ${(props) => props.showPanel === false ? "-385px" : "-15px" } ;
      width: 275px;
  }
`; 
