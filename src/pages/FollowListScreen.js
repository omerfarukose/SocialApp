import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { MyNavbar } from "../components/MyNavbar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../values/Colors";
import React from "react";
import { MyUserItem } from "../components/MyUserItem";

export const FollowListScreen = () => {

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white"
            }}>

            <MyNavbar/>

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



        </SafeAreaView>
    )
}
