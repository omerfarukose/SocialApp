import * as React from 'react';
import { Router } from "./src/pages/Router/Router";
import Toast, {ErrorToast} from "react-native-toast-message";
import { UserContextProvider } from "./src/contexts/UserContext";

export const App = ( ) => {

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
        <UserContextProvider>
            <Router/>
            <Toast config={toastConfig} />
        </UserContextProvider>
    )
}
