import React, { Component, FC, Fragment } from "react";
import styled from "styled-components";

import  mainImage  from "./Belfast.jpg";
import { SearchingMap } from "./searchingMap/SearchingMap";
import  GlobalStyles  from "./styles/globalStyles";


const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-image: url(${mainImage});
`;


export const App: React.FC = () => (
    <Fragment>
        <GlobalStyles />
        <MainWrapper>
            <SearchingMap/>   
        </MainWrapper>    
     </Fragment>   
) 




 /*
import { useState, useEffect } from 'react';

function useMousePosition() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = e => {
      setX(e.clientX);
      setY(e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
    
  return { x, y };
}


class ExampleComponent extends Component {
    render(){
        const { x, y } = this.props;     
        return <div>Current Mouse Position: ({x}, {y})</div>;
    }
  
  }

  const withWindowResize = Component => {
    return (props) => {
        const { x, y } = useMousePosition()
      return <Component { ...props} x={x} y={y}/>;
    }
  };
      

  const Effect = withWindowResize(ExampleComponent);
  
  export const App: React.FC = () => (
      <Effect />
  )

  
  */