import React, { FC, useState } from "react"
import { I } from "../worldMap/models/types/componentsInterfaces";
import { ThemesToggleBar } from "./components/ThemesToggleBar";
import { Theme } from "./models/Theme";
import { ThemesMenu, MapThemesMenuStyled } from "./styles/mapThemesMenuStyles";


export const MapThemesMenu:FC<I.MapThemesMenu> = (props) => {

    const [toggleState, setToggler] = useState(false);

    const themes = [
        'normal.day',
        'reduced.night',  
        'normal.day.transit',
        'normal.night',
        'normal.day.grey',
        'normal.night.grey',                 
        'reduced.day',
        'pedestrian.night',
        'pedestrian.day',
        
    ];
    const thumbnails: JSX.Element[] = themes.map((theme, key) => // TO MEMO (?)
        <Theme 
            theme={theme}
            key={key} 
            onChangeTheme={props.onChangeTheme}
        />);
        
    return (
        <MapThemesMenuStyled className="themesBar">
            <ThemesToggleBar toggle={setToggler} toggleState={toggleState}>Themes</ThemesToggleBar>
            <ThemesMenu className="themesMenu" showUpBar={toggleState}> {thumbnails} </ThemesMenu>
        </MapThemesMenuStyled>
    )
}