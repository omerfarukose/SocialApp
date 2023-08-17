import {SafeAreaView, StatusBar, View} from "react-native";
import { MyNavbar } from "../MyNavbar";
import React, {useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";

export const MyMainLayout = ( props ) => {

    let { theme } = useContext(ThemeContext);

    let { showGoBack, showLogout, showSettings, layoutStyle, mainViewStyle, showNavbar = true } = props;

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.mainColor,
                ...mainViewStyle
            }}>

            <StatusBar
                animated={true}
                backgroundColor={theme.mainColor}
                barStyle={"light-content"}
                showHideTransition={"fade"}
                hidden={false}/>
            
            {
                showNavbar &&
                <MyNavbar showGoBack={showGoBack} showSettings={showSettings} showLogout={showLogout}/>
            }

            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    ...layoutStyle
                }}>

                {
                    props.children
                }

            </View>
            
            

        </SafeAreaView>
    )
}
