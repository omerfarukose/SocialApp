import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { GetCurrentUserInfo } from "../helper/functions/firebase/Firestore";

export const ProfileScreen = ( ) => {

    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerCount, setFollowerCount] = useState(100);
    const [followingCount, setFollowingCount] = useState(99);

    useEffect(() => {

        GetCurrentUserInfo()
            .then((res) => {

            })

    },[])

    const _renderFollowInfoText = ( title, value ) => {
        return(
            <TouchableOpacity
                onPress={() => navigate("FollowList")}
                style={{
                    alignItems: "center",
                    marginTop: 20,
                }}>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: AppColors.mainColor,
                    }}>

                    { value }

                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: AppColors.mainColor,
                    }}>

                    { title }

                </Text>

            </TouchableOpacity>
        )
    }

    return(
        <MyMainLayout showLogout={true}>

            <View
                style={{
                    width: "100%",
                }}>

                {/*banner*/}
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "orange"
                    }}>

                    <Image
                        source={require("../assets/images/banner.jpg")}
                        style={{
                            width: "100%",
                            height: 150,
                        }}/>

                </View>

                {/*info view*/}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}>

                    <View
                        style={{
                            flexDirection: "row",
                        }}>

                        { _renderFollowInfoText("Follower", followerCount) }

                        <Image
                            source={{uri: avatarUrl}}
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 99,
                                borderWidth: 2,
                                borderColor: AppColors.mainColor,
                                marginTop: -65,
                            }}/>

                        { _renderFollowInfoText("Following", followingCount) }


                    </View>

                    <View
                        style={{
                            marginTop: 20,
                        }}>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: hp(4),
                                color: AppColors.mainColor,
                            }}>

                            Ömer Faruk

                        </Text>

                        <MyButton
                            style={{
                                backgroundColor: "white",
                                borderColor: AppColors.mainColor,
                                borderWidth: 2,
                                borderRadius: 20,
                                alignItems: "center",
                                marginTop: 20,
                            }}
                            textStyle={{
                                color: AppColors.mainColor,
                                fontWeight: "bold",
                            }}
                            title={"Follow"}/>

                    </View>

                </View>

            </View>

        </MyMainLayout>
    )
}
