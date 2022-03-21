type Theme = {
   colors: {
      panel:{ 
         [key: string]: { text: string } | string 
      }
   }
}

export const panelColor = (key: string) => {
   return ({theme}: {theme: Theme}) => theme.colors.panel[key]
}
