import React, { useContext, useEffect, useState } from "react";
import {ActivityIndicator, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import {GetCurrentUserInfo, UpdateUserProfileImage} from "../helper/functions/firebase/Firestore";
import { MyCardView } from "../components/MyCardView";
import { ThemeContext } from "../contexts/ThemeContext";
import { MyButton } from "../components/MyButton";
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {MyIconButton} from "../components/MyIconButton";

export const ProfileScreen = (props) => {

    let { theme } = useContext(ThemeContext);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [postsSelected, setPostSelected] = useState(true);
    
    useEffect(() => {

        GetCurrentUserInfo()
            .then((userInfo) => {
                setUserId(userInfo.id)
                setUsername(userInfo.username);
                setAvatarUrl(userInfo.avatar);
                setFollowerList(userInfo.followers);
                setFollowingList(userInfo.following);
                setPostList(userInfo.posts);
                setLikeList(userInfo.likes);
            })
            .finally(() => setIsReady(true))

    },[props])

    const chooseFile = async  () => {
        const path = await ImagePicker.launchImageLibrary(ImagePicker.ImageLibraryOptions);

        let uri = path.assets[0].uri.replace('file://', '');
        
        setIsImageModalVisible(false);
        
        UpdateUserProfileImage(uri)
            .then((imageUrl) => {
                setAvatarUrl(imageUrl);
            })

    };

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
                        fontSize: hp(2.3),
                        fontWeight: "400",
                        color: theme.secondColor,
                    }}>

                    { list.length }

                </Text>

                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: "500",
                        color: theme.secondColor,
                    }}>

                    { title }

                </Text>

            </TouchableOpacity>
        )
    }

    return(
        <MyMainLayout showLogout={true}>
            
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
                                        width: wp(70),
                                        alignSelf: "center",
                                        justifyContent: "space-evenly"
                                    }}>
                                    
                                    { _renderFollowInfoText("Follower", followerList) }
                                    
                                    <TouchableOpacity
                                        onPress={() => setIsImageModalVisible(true)}>
                                        
                                        <View
                                            style={{
                                                width: wp(50),
                                                alignItems: "center"
                                            }}>
                                            
                                            <Image
                                                source={{uri: avatarUrl}}
                                                style={{
                                                    width: wp(30),
                                                    height: wp(30),
                                                    borderRadius: 99,
                                                    borderWidth: 2,
                                                    borderColor: theme.mainColor,
                                                    marginTop: -45,
                                                }}/>
                                        
                                        </View>
                                    
                                    </TouchableOpacity>
                                    
                                    { _renderFollowInfoText("Following", followingList) }
                                
                                
                                </View>
                                
                                <View
                                    style={{
                                        marginTop: 20,
                                    }}>
                                    
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: hp(3.5),
                                            color: theme.mainColor,
                                            textAlign: "center"
                                        }}>
                                        
                                        { username }
                                    
                                    </Text>
                                
                                </View>
                            
                            </View>
                        
                        </View>
                        
                        <View
                            style={{
                                flexDirection: "row",
                                borderColor: theme.mainColor,
                                borderBottomWidth: 1,
                                height: hp(6)
                            }}>
                            
                            <TouchableOpacity
                                onPress={() => setPostSelected(true)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottomWidth: postsSelected ? 2 : 0,
                                    borderColor: theme.mainColor
                                }}>
                                
                                <Text
                                    style={{
                                        color: theme.mainColor,
                                        fontSize: hp(2.3)
                                    }}>
                                    
                                    Posts
                                    
                                </Text>
                                
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={() => setPostSelected(false)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottomWidth: !postsSelected ? 2 : 0,
                                    borderColor: theme.mainColor
                                }}>
                                
                                <Text
                                    style={{
                                        color: theme.mainColor,
                                        fontSize: hp(2.3)
                                    }}>
                                    
                                    Likes
                                    
                                </Text>
                            
                            </TouchableOpacity>
                            
                        </View>
                        
                        {/*posts view*/}
                        <View>
                            
                            {
                                postList.length > 0 &&
                                <FlatList
                                    overScrollMode={"never"}
                                    data={postsSelected ? postList : likeList}
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

            <Modal
                transparent={true}
                visible={isImageModalVisible}>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: 'rgba(52, 52, 52, 0.4)' // transparent background
                    }}>

                    <View
                        style={{
                            width: wp(80),
                            height: hp(40),
                            justifyContent: "space-evenly",
                            alignSelf: "center",
                            borderRadius: 20,
                            backgroundColor: "white",
                            borderColor: "#eceff1",
                            borderWidth: 1
                        }}>
                        
                        <MyIconButton
                            onPress={() => setIsImageModalVisible(false)}
                            iconName={"times-circle"}
                            iconSize={wp(6)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}/>

                        <Image
                            source={{uri: avatarUrl}}
                            style={{
                                width: wp(50),
                                height: wp(50),
                                borderRadius: 99,
                                borderWidth: 2,
                                borderColor: theme.mainColor,
                                alignSelf: "center"
                            }}/>
                        
                        <View
                            style={{
                                flexDirection: "row",
                                width: wp(50),
                                alignSelf: "center",
                                justifyContent: "space-evenly",
                            }}>
                            
{/*                            <MyIconButton
                                onPress={() => chooseFile()}
                                iconName={"trash-alt"}
                                iconSize={wp(6)}/>*/}
                            
                            <MyIconButton
                                onPress={() => chooseFile()}
                                iconName={"photo-video"}
                                iconSize={wp(6)}/>
                            
                        </View>
                        
                    </View>

                </View>

            </Modal>

        </MyMainLayout>
    )
}
