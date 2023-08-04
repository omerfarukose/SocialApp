import {createContext, useState} from "react";
import { darkTheme, lightTheme } from "../values/Colors";

export const ThemeContext = createContext();

export const ThemeContextProvider = ( props ) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const theme = isDarkTheme ? darkTheme : lightTheme;

    return(
        <ThemeContext.Provider
            value={{
                isDarkTheme,setIsDarkTheme, theme
            }}>

            { props.children }

        </ThemeContext.Provider>
    )
}
