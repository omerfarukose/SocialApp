import { SafeAreaView } from "react-native";
import { MyNavbar } from "../MyNavbar";
import React from "react";

export const MyMainLayout = ( props ) => {

    let { showGoBack } = props;

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}>

            <MyNavbar showGoBack={showGoBack}/>

            {
                props.children
            }

        </SafeAreaView>
    )
}
