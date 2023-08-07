import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { MyButton } from "../components/MyButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { GetUserInfoById, HandleFollow } from "../helper/functions/firebase/Firestore";
import { MyCardView } from "../components/MyCardView";
import { ThemeContext } from "../contexts/ThemeContext";
import {GetUserId} from "../helper/functions/UserInfo";

export const UserProfileScreen = ({route}) => {

    const { userId } = route.params;

    console.log("UserProfileScreen userID : ", userId);

    let { theme } = useContext(ThemeContext);


    const [profileId, setProfileId] = useState("");
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showFollow, setShowFollow] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect( () => {
        
        let currentUserId = GetUserId();
        
        _resetAllInfo();
        
        GetUserInfoById(userId)
            .then((userInfo) => {
                setProfileId(userInfo.id)
                setUsername(userInfo.username);
                setAvatarUrl(userInfo.avatar);
                setFollowerList(userInfo.followers);
                setFollowingList(userInfo.following);
                setPostList(userInfo.posts);
                setLikeList(userInfo.likes);
                setShowFollow(userInfo.id !== currentUserId);
                setIsFollowing(userInfo.followers.includes(currentUserId));
            })
            .finally(() => setIsReady(true))

    },[userId])

    const _resetAllInfo = ( ) => {
        setUsername("");
        setAvatarUrl("https://cdn-icons-png.flaticon.com/512/1053/1053244.png")
    }

    const _renderFollowInfoText = ( title, list ) => {
        return(
            <TouchableOpacity
                onPress={() => navigate("FollowList", {userList: list})}
                style={{
                    alignItems: "center",
                    marginTop: 20,
                }}>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: theme.mainColor,
                    }}>

                    { list.length }

                </Text>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: theme.mainColor,
                    }}>

                    { title }

                </Text>

            </TouchableOpacity>
        )
    }

    const _handleFollowPress = ( ) => {

        HandleFollow(userId, profileId)
            .then(() => {
                setIsFollowing(!isFollowing);
            })
    }

    return(
        <MyMainLayout showGoBack={true}>
            
            {
                isReady ?
                    
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
                                            borderColor: theme.mainColor,
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
                                            color: theme.mainColor,
                                            textAlign: "center"
                                        }}>
                                        
                                        { username }
                                    
                                    </Text>
                                    
                                    {
                                        showFollow &&
                                        <MyButton
                                            onPress={() => _handleFollowPress()}
                                            style={{
                                                backgroundColor: "white",
                                                borderColor: theme.mainColor,
                                                borderWidth: 2,
                                                borderRadius: 20,
                                                alignItems: "center",
                                                marginTop: 20,
                                            }}
                                            textStyle={{
                                                color: theme.mainColor,
                                                fontWeight: "bold",
                                            }}
                                            title={isFollowing ? "Unfollow" : "Follow"}/>
                                    }
                                
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
                    
                    :
                    
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        
                        <ActivityIndicator size={"large"}/>
                    
                    </View>
            }

        </MyMainLayout>
    )
}
