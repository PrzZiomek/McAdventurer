 import { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent } from "react"
import { useDispatch } from "react-redux";

import { ThemesToggleBar } from "./components/ThemesToggleBar";
import { Theme } from "./models/Theme";
import { ThemesMenu, MapThemesMenuStyled } from "./styles/mapThemesMenuStyles";


export const MapThemesMenu:FC = () => {

    const [toggleState, setToggler] = useState(false);
    const dispatch = useDispatch();

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

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        dispatch({type: "SET_MAP_THEME", payload:  themeElement.id})
      }

    const thumbnails: JSX.Element[] = themes.map((theme, key) => // TO MEMO (?)
        <Theme 
            theme={theme}
            key={key} 
            onChangeTheme={onChangeTheme}
        />);
        
    return (
        <MapThemesMenuStyled className="themesBar">
            <ThemesToggleBar toggle={setToggler} toggleState={toggleState}>Themes</ThemesToggleBar>
            <ThemesMenu className="themesMenu" showUpBar={toggleState}> {thumbnails} </ThemesMenu>
        </MapThemesMenuStyled>
    )
}