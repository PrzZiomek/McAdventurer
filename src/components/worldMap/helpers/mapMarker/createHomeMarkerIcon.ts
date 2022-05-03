import { setStyles } from "../setStyles";


export const createHomeMarkerIcon = () => {
   const element = document.createElement('div');
   const wrapper = document.createElement('div');

   setStyles(element,{
      position: "absolute",
      borderRadius:" 50%",
      backgroundColor:"#F00", 
      width: "14px",
      height:"14px",
   })

   wrapper.style.zIndex = "10";
   wrapper.appendChild(element);
   
   const domIcon = new H.map.DomIcon(wrapper);

   return domIcon
}
