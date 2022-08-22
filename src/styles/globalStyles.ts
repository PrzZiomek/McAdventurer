import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }

    #root{
        margin:0 auto;
    }

    html,
    body,
    main{
        background-color: #DFDFCE; 
    }
    
`


export default GlobalStyles;