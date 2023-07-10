import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { AppColors } from "../values/Colors";
import { MyCardView } from "../components/MyCardView";

export const HomeScreen = ( ) => {

    return(
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>

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

            <View
                style={{
                    flex: 1,
                }}>

                <MyCardView/>

            </View>

        </SafeAreaView>
    )
}
