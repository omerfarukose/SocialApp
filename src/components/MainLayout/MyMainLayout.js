import { SafeAreaView, View } from "react-native";
import { MyNavbar } from "../MyNavbar";
import React from "react";

export const MyMainLayout = ( props ) => {

    let { showGoBack, layoutStyle } = props;

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}>

            <MyNavbar showGoBack={showGoBack}/>

            <View
                style={{
                    flex: 1,
                    ...layoutStyle
                }}>

                {
                    props.children
                }

            </View>

        </SafeAreaView>
    )
}
