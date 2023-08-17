import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    FlatList, Image, Modal, RefreshControl, 
    ScrollView, Text,  TouchableOpacity, View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { GetCurrentUserInfo, UpdateUserProfileImage } from "../helper/functions/firebase/Firestore";
import { MyCardView } from "../components/MyCardView";
import { ThemeContext } from "../contexts/ThemeContext";
import { MyIconButton } from "../components/MyIconButton";
import { MyActivityIndicator } from "../components/MyActivityIndicator";
import { MyButton } from "../components/MyButton";
import { MyTextInput } from "../components/Input/MyTextInput";
import * as ImagePicker from 'react-native-image-picker';
import Icon from "react-native-vector-icons/FontAwesome5";

export const ProfileScreen = (props) => {

    let { theme } = useContext(ThemeContext);

    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [postsSelected, setPostSelected] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [isProfileImageVisible, setIsProfileImageVisible] = useState(false);
    
    useEffect(() => {

        GetCurrentUserInfo()
            .then((userInfo) => {
                setUsername(userInfo.username);
                setAvatarUrl(userInfo.avatar);
                setFollowerList(userInfo.followers);
                setFollowingList(userInfo.following);
                setPostList(userInfo.posts);
                setLikeList(userInfo.likes);
                setNewAvatar(userInfo.avatar);
            })
            .finally(() => setIsReady(true))

    },[props])

    const chooseFile = async  (type) => {
        const path = await ImagePicker.launchImageLibrary(ImagePicker.ImageLibraryOptions);
        
        setNewAvatar(path.assets[0].uri);
    };
    
    const _updateProfile  = ( ) => {
        
        // upload profile picture if new picture selected
        if (avatarUrl !== newAvatar) {
            let uri = newAvatar.replace('file://', '');
            
            UpdateUserProfileImage(uri)
                .then((imageUrl) => {
                    setAvatarUrl(imageUrl);
                });
        }
        
        if(username !== newUsername) {
            // TODO: update username
        }
        
        // TODO: add banner update method
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
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        
        GetCurrentUserInfo()
            .then((userInfo) => {
                setUsername(userInfo.username);
                setAvatarUrl(userInfo.avatar);
                setFollowerList(userInfo.followers);
                setFollowingList(userInfo.following);
                setPostList(userInfo.posts);
                setLikeList(userInfo.likes);
            })
            .finally(() => setRefreshing(false));
        
    }, []);

    return(
        <MyMainLayout showLogout={true}>
            
            {
                isReady ?
                    
                    <ScrollView
                        overScrollMode={"never"}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        style={{
                            flex: 1,
                            backgroundColor: theme.mainBackgroundColor
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
                                        onPress={() => setIsProfileImageVisible(true)}
                                        style={{
                                            width: wp(50),
                                            alignItems: "center"
                                        }}>
                                        
                                        <Image
                                            source={{uri: avatarUrl}}
                                            style={{
                                                width: wp(30),
                                                height: wp(30),
                                                borderRadius: 999,
                                                borderWidth: 2,
                                                borderColor: theme.mainColor,
                                                marginTop: -45,
                                            }}/>
                                    
                                    </TouchableOpacity>
                                    
                                    { _renderFollowInfoText("Following", followingList) }
                                
                                </View>
                                
                                {/* edit profile button */}
                                <TouchableOpacity
                                    onPress={() => setIsImageModalVisible(true)}
                                    style={{
                                        marginTop: hp(1.5),
                                    }}>
                                    
                                    <Icon name={"edit"} size={hp(2.4)} color={theme.mainColor} />
                                    
                                </TouchableOpacity>
                                
                                <View
                                    style={{
                                        marginTop: hp(1),
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
                                    borderColor: theme.borderColor
                                }}>
                                
                                <Text
                                    style={{
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
                                    borderColor: theme.borderColor
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
                            
                            <FlatList
                                overScrollMode={"never"}
                                data={postsSelected ? postList : likeList}
                                renderItem={({item}) => <MyCardView postId={item}/>}
                                keyExtractor={(item, index) => item}/>
                        
                        </View>
                    
                    </ScrollView>
                    
                    :
                    
                    <MyActivityIndicator/>
                    
            }
            
            <Modal
                transparent={true}
                visible={isProfileImageVisible}>
                
                {/*full screen view*/}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.9)' // transparent background
                    }}>
                    
                    <TouchableOpacity
                        onPress={() => setIsProfileImageVisible(false)}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        
                        <Image
                            source={{uri: avatarUrl}}
                            style={{
                                width: wp(100),
                                height: wp(100),
                                borderWidth: 2,
                                borderColor: theme.mainColor
                            }}/>
                        
                    </TouchableOpacity>
                    
                </View>
                
            </Modal>

            <Modal
                transparent={true}
                visible={isImageModalVisible}>

                {/*full screen view*/}
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: 'rgba(52, 52, 52, 0.4)' // transparent background
                    }}>

                    {/*modal view*/}
                    <View
                        style={{
                            width: wp(90),
                            height: hp(70),
                            justifyContent: "space-evenly",
                            alignSelf: "center",
                            borderRadius: 20,
                            backgroundColor: "white",
                            borderColor: "#eceff1",
                            borderWidth: 1
                        }}>
                        
                        {/*close button*/}
                        <MyIconButton
                            onPress={() => setIsImageModalVisible(false)}
                            iconName={"times-circle"}
                            iconSize={wp(6)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}/>
                        
                        {/*profile image*/}
                        <TouchableOpacity
                            onPress={() => chooseFile()}>
                            
                            <Image
                                source={require("../assets/images/banner.jpg")}
                                style={{
                                    width: "100%",
                                    height: wp(40),
                                    alignSelf: "center"
                                }}/>
                            
                        </TouchableOpacity>

                        {/*profile image*/}
                        
                        <TouchableOpacity
                            onPress={() => chooseFile()}>
                            
                            <Image
                                source={{uri: newAvatar}}
                                style={{
                                    width: wp(30),
                                    height: wp(30),
                                    borderRadius: hp(2),
                                    borderWidth: 2,
                                    borderColor: theme.mainColor,
                                    alignSelf: "center"
                                }}/>
                            
                        </TouchableOpacity>
                        
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: wp(5),
                            }}>
                            
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: hp(2)
                                }}>
                                
                                Kullanıcı Adı
                                
                            </Text>
                            
                            <MyTextInput
                                placeholder={username}
                                value={newUsername}
                                setValue={setNewUsername}
                                inputStyle={{
                                    width: wp(50)
                                }}/>
                            
                        </View>
                        
                        <View
                            style={{
                                flexDirection: "row",
                                width: wp(50),
                                alignSelf: "center",
                                justifyContent: "space-evenly",
                            }}>
                            
                            <MyButton
                                title={"Kaydet"}
                                onPress={() => _updateProfile()}/>
                            
                        </View>
                        
                    </View>

                </View>

            </Modal>

        </MyMainLayout>
    )
}
