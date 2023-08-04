import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { navigate } from "./Router/RootNavigation";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { GetCurrentUserInfo } from "../helper/functions/firebase/Firestore";
import { MyCardView } from "../components/MyCardView";
import { ThemeContext } from "../contexts/ThemeContext";
import { MyButton } from "../components/MyButton";
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const ProfileScreen = () => {

    let { theme } = useContext(ThemeContext);

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

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
            });

    },[])


    const chooseFile = async  () => {
        const path = await ImagePicker.launchImageLibrary(ImagePicker.ImageLibraryOptions);
        console.log("res : ", path.assets[0].uri);

/*
        const reference = storage().ref(userId);

        await reference.putFile(path.toString());
*/

        const task = storage()
            .ref(userId)
            .putFile(path.toString());

        // set progress state
        task.on('state_changed', snapshot => {
            console.log("state_changed : ", snapshot);
        });

        try {
            await task;
        } catch (e) {
            console.error(e);
        }

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

                        <TouchableOpacity
                            onPress={() => setIsImageModalVisible(true)}>

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
                                fontSize: hp(4),
                                color: theme.mainColor,
                                textAlign: "center"
                            }}>

                            { username }

                        </Text>

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

            <Modal
                transparent={true}
                visible={isImageModalVisible}>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
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

                        <MyButton
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: 30
                            }}
                            onPress={() => setIsImageModalVisible(false)}/>

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

                        <MyButton
                            onPress={async  () => chooseFile()}
                            title={"Güncelle"}
                            style={{
                                width: wp(30),
                                alignSelf: "center"
                            }}/>

                    </View>

                </View>

            </Modal>

        </MyMainLayout>
    )
}
