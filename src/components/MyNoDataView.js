import {Image, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import React from "react";

export const  MyNoDataView = ( ) => {
    
    return(
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
            
            <Image
                source={require("../assets/images/no-data.png")}
                style={{
                    width: wp(35),
                    height: wp(35),
                }}/>
        
        </View>
    )
}
