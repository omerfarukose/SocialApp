import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { MyCardView } from "../components/MyCardView";
import { MyNavbar } from "../components/MyNavbar";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";

export const HomeScreen = ( ) => {

    return(
        <MyMainLayout>

            <ScrollView
                overScrollMode={"never"}
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

        </MyMainLayout>
    )
}
