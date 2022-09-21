import React from "react";


export const Bar = ({data}) => {
       return (
         <div id="Bar_selected">
           <h1>{data.poi.name}</h1>
           <h3>{data.poi.classifications[0].code} | {(data.dist / 1000).toFixed(2)}km away</h3>
           <p>
             {data.address.streetNumber 
             +  ' '
             + data.address.streetName}
             <br/>
             {data.address.municipality 
             + ', ' + data.address.countrySubdivision
             + ' ' + data.address.postalCode}
           </p>
         </div>
       );
 }