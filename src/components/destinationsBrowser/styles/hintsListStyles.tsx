import styled from "styled-components";
import { Div } from "../../../ui/Div";


export const HintsListStyles = styled(Div)`
   width: 100%;
   margin: 0 7px;
   margin-bottom: 12px;
   padding-left: 9px;
   background: white;
   max-height: 87vh;
   overflow-y: scroll;

   ul{
      list-style: none;
   }

   li{
      margin-bottom: 5px;
   }

   li:last-child{
      margin-bottom: 0px;
   }

   button{
      width: 100%;
      background-color: unset;
      border: none;
      color: #3e3e28;
   }

   button:hover {
      background: #F7F7F3;
   }

   /** custom scroll styles */
   ::-webkit-scrollbar {
      width: 10px;
   }
   ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 7px;
      background: #edede8;
   }
   ::-webkit-scrollbar-thumb {
      background: #C7C7A9;
      cursor: pointer;
      border-radius: 7px; 
   }

 @media (min-width: 768px){
    max-height: 30vh;
 }

`;