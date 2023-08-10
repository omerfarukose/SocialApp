import * as React from 'react';
import { Router } from "./src/pages/Router/Router";
import Toast, {ErrorToast} from "react-native-toast-message";
import { UserContextProvider } from "./src/contexts/UserContext";
import { ThemeContextProvider } from "./src/contexts/ThemeContext";
import {useEffect} from "react";
import {LogBox} from "react-native";

export const App = ( ) => {
    
    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    },[])

    const toastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                text2Style={{
                    fontSize: 15,
                    color: "black"
                }}
            />
        ),
    };

    return(
        <ThemeContextProvider>
            <UserContextProvider>
                <Router/>
                <Toast config={toastConfig} />
            </UserContextProvider>
        </ThemeContextProvider>
    )
}
