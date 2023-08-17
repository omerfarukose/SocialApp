import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import { MyIconButton } from "./MyIconButton";
import React, { useContext, useEffect, useState } from "react";
import {GetPostDataById, GetUserInfoById, HandleLike, HandleRepost} from "../helper/functions/firebase/Firestore";
import { navigate } from "../pages/Router/RootNavigation";
import { ThemeContext } from "../contexts/ThemeContext";
import {UserContext} from "../contexts/UserContext";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {_calculateTime} from "../helper/functions/MyHelperFunctions";
import {MyButton} from "./MyButton";

export const MyCardView = ( props ) => {

    let { postId } = props;

    let { theme } = useContext(ThemeContext);
    let { userPosts, userLikes } = useContext(UserContext);

    const [userId,setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUri, setAvatarUri] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [cardText, setCardText] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [time, setTime] = useState("");
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    
    useEffect(() => {
        
        if (postId){
            GetPostDataById(postId)
                .then((postData) => {
                    setCardText(postData.text);
                    
                    setTime(postData?.time ? _calculateTime(postData?.time) : "");
                    
                    GetUserInfoById(postData.userId)
                        .then((userInfo) => {
                            setUsername(userInfo.username);
                            setAvatarUri(userInfo.avatar);
                            setUserId(userInfo.id);
                            
                            setIsLiked(userLikes.includes(postId))
                            setIsPosted(userPosts.includes(postId))
                        });
                    
                });
        }


    },[])

    const _handleIconPress = async ( type ) => {
        switch (type) {
            case "repost":
                HandleRepost(postId, userId)
                    .then(() => setIsPosted(true))
                break;
            case "like":
                HandleLike(postId, userId)
                    .then(() => setIsLiked(true))
                break;
        }

    }

    return(
        <View
            style={{
                padding: wp(5),
                borderBottomWidth: 1,
                borderBottomColor: theme.borderColor,
                backgroundColor: theme.mainBackgroundColor,
            }}>
            
            {/*image & username & time? */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                
                <TouchableOpacity
                    onPress={() => navigate("UserProfile", {userId: userId})}>
                    
                    <Image
                        source={{uri: avatarUri}}
                        style={{
                            width: hp(6),
                            height: hp(6),
                            borderRadius: 99,
                            borderWidth: 1,
                            borderColor: theme.mainColor,
                        }}/>
                
                </TouchableOpacity>
                
                <Text
                    style={{
                        flex: 1,
                        paddingLeft: 10,
                        paddingTop: 0,
                        fontWeight: "bold",
                        fontSize: hp(2.4),
                        color: theme.darkTextColor
                    }}>
                    
                    { username }
                
                </Text>
                
                <Text
                    style={{
                        fontSize: hp(1.6),
                        color: theme.textColor
                    }}>
                    
                    {"1 saat önce"}
                
                </Text>
            
            </View>
            
            {/* post content */}
            <View
                style={{
                    marginVertical: hp(2),
                    minHeight: hp(8),
                }}>
                
                <Text
                    style={{
                        flex: 1,
                        padding: 10,
                        paddingTop: 0,
                        fontWeight: "400",
                        fontSize: hp(2.3),
                        color: theme.textColor
                    }}>
                    
                    { cardText }
                
                </Text>
            
            </View>
            
            {/*button group*/}
            <View
                style={{
                    width: "90%",
                    alignSelf: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                
                <View>
                    {
                        userPosts.includes(postId) &&
                        <MyIconButton
                            onPress={() => setIsDeleteModalVisible(true)}
                            iconColor={isPosted ? theme.secondColor : "gray"}
                            iconName={"trash"}/>
                    }
                </View>
                
                <View
                    style={{
                        flexDirection: "row",
                        gap: wp(15)
                    }}>
                    
                    <MyIconButton
                        onPress={() => _handleIconPress("repost")}
                        iconColor={isPosted ? theme.secondColor : "gray"}
                        iconName={"retweet"}/>
                    
                    <MyIconButton
                        onPress={() => _handleIconPress("like")}
                        iconColor={isLiked ? "red" : "gray"}
                        iconName={"heart"}/>
                    
                </View>
                
            </View>
            
            <Modal
                transparent={true}
                visible={isDeleteModalVisible}>
                
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.9)', // transparent background
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    
                    {/*modal view*/}
                    <View
                        style={{
                            width: wp(90),
                            height: hp(40),
                            justifyContent: "space-evenly",
                            alignSelf: "center",
                            borderRadius: 20,
                            backgroundColor: "white",
                            borderColor: "#eceff1",
                            borderWidth: 1
                        }}>
                        
                        {/*close button*/}
                        <MyIconButton
                            onPress={() => setIsDeleteModalVisible(false)}
                            iconName={"times-circle"}
                            iconSize={wp(6)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}/>
                        
                        <Text
                            style={{
                                textAlign: "center",
                                color: "black",
                                fontSize: hp(2.4),
                            }}>
                            
                            Postu silmek istediğinden emin misin ?
                            
                        </Text>
                        
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                            }}>
                            
                            <MyButton
                                title={"İptal"}
                                onPress={() => setIsDeleteModalVisible(false)}/>
                            
                            <MyButton
                                title={"Sil"}
                                color={"red"}
                                onPress={() => {
                                    // TODO: handle firebase delete post
                                }}/>
                            
                        </View>
                        
                    </View>
                    
                </View>
                
            </Modal>

        </View>
    )
}
