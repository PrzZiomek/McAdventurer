import { setStyles } from "../helpers/setStyles";


export const createDestinationMarker = () => {
    const outerElement = document.createElement('div');
    const innerElement = document.createElement('div');
    const pin = document.createElement('div');
    const wrapper = document.createElement('div');
    
    setStyles(pin, {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius:" 50%",
      backgroundColor:"white", 
      width: "8px",
      height:"8px",
    }); 

    setStyles(outerElement, {
    position: "absolute",
    top: "-50px",
    left: "-20px",
    borderRadius:" 50%",
    backgroundColor:"#F00", 
    width: "16px",
    height:"16px",
  });
  
  setStyles(innerElement,{
    position: "absolute",
    content: '',
    width: "0",
    height: "0",
    bottom: "-34px",
    left: 0,
    border:" 8px solid transparent",
    borderTop:" 32px solid #F00",
    zIndex: -1
  })

  outerElement.appendChild(innerElement);
  outerElement.appendChild(pin);
  wrapper.style.zIndex = "10";
  wrapper.appendChild(outerElement);
  
  function changeMarkerColor(e: Event) {
    const element = e.target as HTMLDivElement;
    if(element.style.height === "16px"){  
      element.style.backgroundColor = "#ffa500";
    }
    if(element.style.height === "0"){
      element.style.borderTopColor = "#ff6961"
    }
  };

  function giveMarkerColorBack(e: Event) {
    const element = e.target as HTMLDivElement;
    if(element.style.height === "16px"){
      element.style.backgroundColor = "#F00";
    }  
    if(element.style.height === "0"){
      element.style.borderTopColor = "#ff6961"
    }
  };

  const domIcon = new H.map.DomIcon(wrapper, {
    onAttach: function(clonedElement) {
      clonedElement.addEventListener('mouseover',changeMarkerColor);
      clonedElement.addEventListener('mouseout', giveMarkerColorBack);
    },
    onDetach: function(clonedElement) {
      clonedElement.removeEventListener('mouseover', changeMarkerColor);
      clonedElement.removeEventListener('mouseout', giveMarkerColorBack);
    }
  });

  return domIcon
}





