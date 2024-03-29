import { FC, MouseEventHandler } from "react";


export interface Theme{
    theme: string;
    onChangeTheme: MouseEventHandler<HTMLImageElement>;
}

export const Theme = ({theme, onChangeTheme}: Theme) => {

   const img = require('../themesPics/' + theme + '.thumb.png');
   
   return( 
        <img 
            key={ theme } 
            src={ img } 
            onClick={ onChangeTheme } 
            alt={ theme } 
            id={ theme } 
        />
    )
}
