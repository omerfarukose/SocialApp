import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { MyCardView } from "../components/MyCardView";
import { MyNavbar } from "../components/MyNavbar";

export const HomeScreen = ( ) => {

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>

            <MyNavbar/>

            <ScrollView
                style={{
                    flex: 1,
                }}>

                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>
                <MyCardView/>

            </ScrollView>

        </SafeAreaView>
    )
}
