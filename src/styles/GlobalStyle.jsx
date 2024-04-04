import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
    }

    body{
        background-color: #FFFFFF;
    }

    a {
        all: unset;
    }

    .page-title{
        
    }

` 

export default Global