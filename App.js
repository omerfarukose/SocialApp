import * as React from 'react';
import { Router } from "./src/pages/Router/Router";
import Toast, {ErrorToast} from "react-native-toast-message";
import { UserContextProvider } from "./src/contexts/UserContext";
import { ThemeContextProvider } from "./src/contexts/ThemeContext";
import {useEffect} from "react";
import {LogBox} from "react-native";
import moment from "moment";

export const App = ( ) => {
    
    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    },[])
    
    moment.locale();

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
