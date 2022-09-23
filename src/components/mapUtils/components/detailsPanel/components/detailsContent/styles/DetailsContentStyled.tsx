import styled from "styled-components";
import { Article } from "../../../../../../../ui/Article";
import { Div } from "../../../../../../../ui/Div";



export const DetailsContentStyled = styled(Article)`

   margin-top: 30px;
   padding: 10px;
   padding-left: 20px;
   max-height: 400px;
   overflow-y: auto;
   color: #3e3e28;
   text-align: center;

   h2{
      margin-bottom: 16px;
   }

   h3{
      margin-top: 10px;
   }

   h4{
      margin-bottom: 10px;
   }

   ul{
      list-style: none;
   }

   li {
      margin-top: 20px;
   }

   li::first-child {
      margin-top: 0;
   }

   .clickedDestination__List  .highlight{
      background: #f2f2e9;
   }

   input{
      border: 1px solid #3E3E28;
   }

   ::-webkit-scrollbar {
      width: 10px;
   }
   ::-webkit-scrollbar-track {
      border-radius: 7px;
      background: #edede8;
   }
   ::-webkit-scrollbar-thumb {
      background: #C7C7A9;
      cursor: pointer;
      border-radius: 7px; 
   }

   .react-search-box-dropdown{

         margin: 0;

         li {
            margin: 0px;
            border: 1px solid #C7C7A9;
         }

         li:hover{
            background: #f2f2e9;
         }
   }
`