import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../values/Colors";
import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { navigate } from "../pages/Router/RootNavigation";

export const MyUserItem = () => {

    return(
        <TouchableOpacity
            onPress={() => navigate("Profile")}
            style={{
                backgroundColor: "white",
                height: hp(10),
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: AppColors.mainColor,
                borderBottomWidth: 1,
            }}>

            <Image
                source={{uri: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"}}
                style={{
                    width: hp(6),
                    height: hp(6),
                    marginHorizontal: hp(2),
                    borderRadius: 99,
                    borderWidth: 2,
                    borderColor: AppColors.mainColor,
                }}/>

            <Text
                style={{
                    fontSize: hp(2.6),
                    color: AppColors.mainColor,
                }}>

                Sample User

            </Text>

        </TouchableOpacity>
    )
}
