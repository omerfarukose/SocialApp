import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppColors } from "../values/Colors";
import { Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { navigate } from "../pages/Router/RootNavigation";
import { GetUserInfoById } from "../helper/functions/firebase/Firestore";

export const MyUserItem = (params) => {

    let { userId } = params;

    console.log("MyUserItem userid : ", userId);

    const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [username, setUsername] = useState("");

    useEffect(() => {
        GetUserInfoById(userId)
            .then((userInfo) => {
                setAvatar(userInfo.avatar);
                setUsername(userInfo.username);
            })
    }, [])

    return(
        <TouchableOpacity
            onPress={() => navigate("UserProfile", {userId: userId})}
            style={{
                backgroundColor: "white",
                height: hp(10),
                flexDirection: "row",
                alignItems: "center",
            }}>

            <Image
                source={{uri: avatar}}
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

                { username }

            </Text>

        </TouchableOpacity>
    )
}
