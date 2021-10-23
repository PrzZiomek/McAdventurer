import React, { FC, MouseEventHandler, useState } from "react"
import styled from "styled-components";
import { Div } from "../ui/Div";
import { ThemesToggleBar } from "./components/ThemesToggleBar";
import { Theme } from "./models/Theme";
import { ThemesMenu } from "./styles/mapThemesMenuStyles";

export const ThemesMenuSection = styled(Div)`
   position: absolute;
   bottom:0;
   right: 0;
   width: 800px;
` 

interface MapThemesMenu{
  onChangeTheme: MouseEventHandler<HTMLImageElement>;
}

export const MapThemesMenu:FC<MapThemesMenu> = (props) => {

    const [toggleState, setToggler] = useState(false);

    const themes = [
        'normal.day',
        'normal.day.grey',
        'normal.day.transit',
        'normal.night',
        'normal.night.grey',
        'reduced.night',            
        'reduced.day',
        'pedestrian.day',
        'pedestrian.night',
    ];
    const thumbnails: JSX.Element[] = themes.map((theme, key) => 
        <Theme 
            theme={theme}
            key={key} 
            onChangeTheme={props.onChangeTheme}
        />);
        
    return (
        <ThemesMenuSection className="themesSection" >
            <ThemesToggleBar toggle={setToggler} toggleState={toggleState}>Themes</ThemesToggleBar>
            <ThemesMenu showUpBar={toggleState}> {thumbnails} </ThemesMenu>
        </ThemesMenuSection>
    )
}