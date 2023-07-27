import { Text, View } from "react-native";
import { AppColors } from "../values/Colors";

export const MyNavbar = ( ) => {

    return(
        <View
            style={{
                backgroundColor: AppColors.mainColor,
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
            }}>

            <Text
                style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20
                }}>

                social

            </Text>

        </View>
    )
}
