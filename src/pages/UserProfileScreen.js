import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../values/Colors";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { GetUserInfoById } from "../helper/functions/firebase/Firestore";
import { MyCardView } from "../components/MyCardView";

export const UserProfileScreen = ({route}) => {

    const { userId } = route.params;

    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {

        GetUserInfoById(userId)
            .then((userInfo) => {
                setUsername(userInfo.username);
                setAvatarUrl(userInfo.avatar);
                setFollowerList(userInfo.followers);
                setFollowingList(userInfo.following);
                setPostList(userInfo.posts);
                setLikeList(userInfo.likes);
            });

    },[])

    const _renderFollowInfoText = ( title, list ) => {
        return(
            <TouchableOpacity
                onPress={() => navigate("FollowList", {list: list})}
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

                    { list.length }

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

            <ScrollView
                overScrollMode={"never"}
                style={{
                    flex: 1,
                }}>

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

                            { _renderFollowInfoText("Follower", followerList) }

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

                            { _renderFollowInfoText("Following", followingList) }


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
                                    textAlign: "center"
                                }}>

                                { username }

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

                {/*posts view*/}
                <View>

                    {
                        postList.length > 0 &&
                        <FlatList
                            overScrollMode={"never"}
                            data={postList}
                            renderItem={({item}) => <MyCardView postId={item}/>}
                            keyExtractor={(item, index) => item}/>
                    }

                </View>

            </ScrollView>

        </MyMainLayout>
    )
}
