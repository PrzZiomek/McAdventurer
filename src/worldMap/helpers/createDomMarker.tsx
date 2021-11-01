import CSS from "csstype";
import { CSSProperties } from "styled-components";


export  function createDomMarker() {
    const outerElement = document.createElement('div');
    const innerElement = document.createElement('div');
    const wrapper = document.createElement('div');
    const styledOuterEl = setStyles(outerElement, {
    position: "absolute",
    borderRadius:" 50%",
    backgroundColor:"#F00", 
    width: "24px",
    height:"24px",
  }) 
  const styledInnerEl = setStyles(innerElement,{
    position: "absolute",
    content: '',
    width: 0,
    height: "0",
    bottom: "-42px",
    left: 0,
    border:" 12px solid transparent",
    borderTop:" 40px solid #F00",
    zIndex: -1
  })

  outerElement.appendChild(innerElement);
  wrapper.style.zIndex = "10";
  wrapper.appendChild(outerElement);
  
  function changeMarkerColor(e: Event) {
    const element = e.target as HTMLDivElement;
    if(element.style.height === "24px"){  
      element.style.backgroundColor = "#ffa500";
    }
    if(element.style.height === "0"){
      element.style.borderTopColor = "#ff6961"
    }
  };

  function giveMarkerColorBack(e: Event) {
    const element = e.target as HTMLDivElement;
    if(element.style.height === "24px"){
      element.style.backgroundColor = "#F00";
    }
    if(element.style.height === "0"){
      element.style.borderTopColor = "#ff6961"
    }
  };

  const domIcon = new H.map.DomIcon(wrapper, {
    onAttach: function(clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener('mouseover',changeMarkerColor);
      clonedElement.addEventListener('mouseout', giveMarkerColorBack);
    },
    onDetach: function(clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener('mouseover', changeMarkerColor);
      clonedElement.removeEventListener('mouseout', giveMarkerColorBack);
    }
  });

  return domIcon
}


interface StyleableDomElement extends HTMLElement{
  style: { [key:string]: CSSProperties | string | number  } & CSSStyleDeclaration  
}

type StyleDeclaration<K extends string = string> = {
  [key in K]: CSSProperties;
}

function setStyles(element: StyleableDomElement, styles: { [key: string]: keyof CSS.Properties }){
  for(const s in styles) {
     element.style[s] = styles[s];
  } 
  return element;
}



