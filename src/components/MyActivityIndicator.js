import {ActivityIndicator, View} from "react-native";
import React from "react";

export const MyActivityIndicator = ( ) => {
    
    return(
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
            
            <ActivityIndicator size={"large"}/>
        
        </View>
    )
}
