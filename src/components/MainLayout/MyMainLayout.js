import {SafeAreaView, StatusBar, View} from "react-native";
import { MyNavbar } from "../MyNavbar";
import React, {useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";

export const MyMainLayout = ( props ) => {

    let { theme } = useContext(ThemeContext);

    let { showGoBack, showLogout, showSettings, layoutStyle } = props;

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.mainColor,
            }}>

            <StatusBar
                animated={true}
                backgroundColor="#4655F6"
                barStyle={"light-content"}
                showHideTransition={"fade"}
                hidden={false}/>

            <MyNavbar showGoBack={showGoBack} showSettings={showSettings} showLogout={showLogout}/>

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
