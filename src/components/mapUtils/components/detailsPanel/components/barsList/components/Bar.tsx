import React from "react";
import styled from "styled-components";

import { Local } from "../../../../../../../generalTypes/apiResponse";
import { Section } from "../../../../../../../ui/Section";


export const BarStyled = styled(Section)`
   //padding: 10px;

   h1{
      margin: 10px 0;
   }

   h3{
      margin-bottom: 10px;
   }
`

export const Bar = ({ data }: { data: Local }) => {
       return (
         <BarStyled id="Bar_selected">
           <h1>{data.poi.name}</h1>
           <h3>{data.poi.classifications[0].code} | {(data.dist / 1000).toFixed(2)}km away</h3>
           <div>
               <p>
                  <span>${data.address.streetNumber} ${data.address.streetName}</span>
                  <span>${data.address.municipality}, ${data.address.countrySubdivision} ${data.address.postalCode}</span>
               </p>
           </div>          
         </BarStyled>
       );
 }