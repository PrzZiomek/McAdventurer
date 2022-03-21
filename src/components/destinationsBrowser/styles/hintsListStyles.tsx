import styled from "styled-components";
import { Div } from "../../../ui/Div";


export const HintsListStyles = styled(Div)`
   position: absolute;
   top: 70%;
   left: 0;
   width: 100%;
   z-index: 100;
   padding-left: 10px;
   background: white;
   height: 80vh;
   overflow-y: scroll;

   ul{
      list-style: none;
   }

   li {
      margin-bottom: 5px;
   }

   button{
      width: 100%;
      background-color: unset;
      border: none;
   }

   button:hover {
      background: #F7F7F3;
   }

   /** custom scroll styles */
   ::-webkit-scrollbar {
      width: 5px;
   }
   ::-webkit-scrollbar-track {
  // background: #f1f1f1;
      border-radius: 7px;
   }
   ::-webkit-scrollbar-thumb {
      background: #3e3e28;
      border-radius: 7px;
   }
`