import React, { FC, MouseEventHandler, useState } from "react"
import { ThemesToggleBar } from "./components/ThemesToggleBar";
import { Theme } from "./models/Theme";
import { ThemesMenu, MapThemesMenuStyles  } from "./styles/mapThemesMenuStyles";


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
    const thumbnails: JSX.Element[] = themes.map((theme, key) => // TO MEMO (?)
        <Theme 
            theme={theme}
            key={key} 
            onChangeTheme={props.onChangeTheme}
        />);
        
    return (
        <MapThemesMenuStyles className="themesBar">
            <ThemesToggleBar toggle={setToggler} toggleState={toggleState}>Themes</ThemesToggleBar>
            <ThemesMenu className="themesMenu" showUpBar={toggleState}> {thumbnails} </ThemesMenu>
        </MapThemesMenuStyles>
    )
}