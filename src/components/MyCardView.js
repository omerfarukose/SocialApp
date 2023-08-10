import { Image, Text, TouchableOpacity, View } from "react-native";
import { MyIconButton } from "./MyIconButton";
import { useContext, useEffect, useState } from "react";
import {GetPostDataById, GetUserInfoById, HandleLike, HandleRepost} from "../helper/functions/firebase/Firestore";
import { navigate } from "../pages/Router/RootNavigation";
import { ThemeContext } from "../contexts/ThemeContext";
import {UserContext} from "../contexts/UserContext";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

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

    useEffect(() => {

        GetPostDataById(postId)
            .then((postData) => {
                setCardText(postData.text)

                GetUserInfoById(postData.userId)
                    .then((userInfo) => {
                        setUsername(userInfo.username);
                        setAvatarUri(userInfo.avatar);
                        setUserId(userInfo.id);
                        
                        console.log("posts id : ", postId)
                        console.log("posts : ", userPosts)
                        console.log("likes : ", userPosts)
                        
                        setIsLiked(userLikes.includes(postId))
                        setIsPosted(userPosts.includes(postId))
                    });

            });

    },[])

    const _handleIconPress = async ( type ) => {
        switch (type) {
            case "repost":
                HandleRepost(postId)
                    .then(() => {
                        console.log("_handleRepost then");
                    })
                    .catch(() => {
                        console.log("_handleRepost catch");
                    })
                break;
            case "like":
                HandleLike(postId)
                    .then(() => {
                        console.log("_handleRepost then");
                    })
                    .catch(() => {
                        console.log("_handleRepost catch");
                    })
                break;
        }

    }

    return(
        <View
            style={{
                padding: wp(5),
                borderBottomWidth: 1,
                borderBottomColor: "#d7d5d5",
                backgroundColor: "white",
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
                    }}>
                    
                    { username }
                
                </Text>
                
                <Text
                    style={{
                        fontSize: hp(1.6),
                    }}>
                    
                    1 saat önce
                
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
                    justifyContent: "flex-end",
                    gap: wp(15),
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
    )
}
