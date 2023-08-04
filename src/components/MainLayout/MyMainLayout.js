import {SafeAreaView, StatusBar, View} from "react-native";
import { MyNavbar } from "../MyNavbar";
import React from "react";

export const MyMainLayout = ( props ) => {

    let { showGoBack, showLogout, layoutStyle } = props;

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#4655F6",
            }}>

            <StatusBar
                animated={true}
                backgroundColor="#4655F6"
                barStyle={"light-content"}
                showHideTransition={"fade"}
                hidden={false}/>

            <MyNavbar showGoBack={showGoBack} showLogout={showLogout}/>

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
