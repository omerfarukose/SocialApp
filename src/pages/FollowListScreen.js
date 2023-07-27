import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { MyNavbar } from "../components/MyNavbar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../values/Colors";
import React from "react";
import { MyUserItem } from "../components/MyUserItem";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";

export const FollowListScreen = () => {

    return(
        <MyMainLayout
            showGoBack={true}>

            <ScrollView
                overScrollMode={"never"}
                style={{
                    flex: 1,
                }}>

                <MyUserItem/>
                <MyUserItem/>
                <MyUserItem/>
                <MyUserItem/>

            </ScrollView>

        </MyMainLayout>
    )
}
